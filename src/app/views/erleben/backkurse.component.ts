import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import { BackterminSucheListItem } from '../../models/backtermine';

@Component({
  selector: 'app-backkurse',
  templateUrl: './backkurse.component.html',
  styles: []
})
export class BackkurseComponent implements OnInit {
  stichwort = '';
  withUmkreis = true;
  myPLZ = '';
  umkreisDistance = 80;
  backtermineList: BackterminSucheListItem[] = undefined;
  searchResultCounter = -1;

  constructor(private lumaraService: LumaraService, private router: Router) { }

  ngOnInit() {
  }

  searchBacktermine() {
    this.searchResultCounter = -1;
    // tslint:disable-next-line:max-line-length
    this.withUmkreis = this.myPLZ.length > 0;
    // tslint:disable-next-line:max-line-length
    this.lumaraService.doCommand(LumaraServiceCommands.SearchBacktermine(this.stichwort, this.withUmkreis, this.myPLZ, this.umkreisDistance)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          console.log('Ich bekam vom Server folgende Daten: ');
          console.log(data);
          // console.log(data.ReturnValue);
          this.backtermineList = JSON.parse(data.ReturnValue);
          this.searchResultCounter = this.backtermineList.length > 0 ? 1 : 0;
        } else if (data.ReturnCode >= 400) {
          // this.router.navigate(['/login']);
          // (data.ReturnMessage);
          alert(data.ReturnMessage);
        }
      }
    );
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
      return 'badge-danger';
    } else if (anzahlFrei < 5) {
      return 'badge-warning';
    }
    return 'text-mute';
  }

}
