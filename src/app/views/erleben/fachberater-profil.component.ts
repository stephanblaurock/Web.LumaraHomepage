import { FachberaterProfil } from './../../models/fachberater';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from 'src/app/service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LumaraServiceCommands } from 'src/app/service/lumara_service_commands';

@Component({
  selector: 'app-fachberater-profil',
  templateUrl: './fachberater-profil.component.html',
  styleUrls: []
})
export class FachberaterProfilComponent implements OnInit {
  fachberaterID = 0;
  fachberaterProfil: FachberaterProfil;
  anstellungCaption = 'Fachberater';

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.fachberaterID = +this.route.snapshot.queryParams.fbid;
    this.reloadFachberaterProfil();
  }

  private reloadFachberaterProfil() {
  this.lumaraService.doCommand(LumaraServiceCommands.GetFachberaterProfilPageModel(this.fachberaterID)).subscribe(
    data => {
      if (data.ReturnCode === 200) {
        console.log('Ich bekam vom Server folgende Daten: ');
        console.log(data);
        // console.log(data.ReturnValue);
        this.fachberaterProfil = JSON.parse(data.ReturnValue);
        if (this.fachberaterProfil.Anstellung === 0) {
          this.anstellungCaption = 'Fachberater';
        } else if (this.fachberaterProfil.Anstellung === 1) {
          this.anstellungCaption = 'Gruppenleitung';
        } else if (this.fachberaterProfil.Anstellung === 2) {
          this.anstellungCaption = 'Bezirksleitung';
        }
      } else if (data.ReturnCode >= 400) {
        // this.router.navigate(['/login']);
        // (data.ReturnMessage);
        alert(data.ReturnMessage);
      }
    }
  );
  }

  getFachberaterImageUrl(userID: number) {
    return this.lumaraService.getUserImageUrl(userID);
  }

  getAnzahlFreiText(anzahlFrei: number) {
    if (anzahlFrei === 0) {
      return '-- ausgebucht! --';
    } else if (anzahlFrei < 5) {
      return 'nur noch wenige Plätze frei!';
    }
    return '';
  }
  getAnzahlFreiClass(anzahlFrei: number) {
    if (anzahlFrei === 0) {
      return 'badge badge-danger';
    } else if (anzahlFrei < 5) {
      return 'badge badge-warning';
    }
    return 'text-mute';
  }
}
