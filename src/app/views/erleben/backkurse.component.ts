import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import { BackterminSucheListItem } from '../../models/backtermine';

@Component({
  selector: 'app-backkurse',
  templateUrl: './backkurse.component.html',
  styles: []
})
export class BackkurseComponent implements OnInit {
  stichwort = '';
  // withUmkreis = true;
  // myPLZ = '';
  umkreisDistance = 80;
  backtermineList: BackterminSucheListItem[] = undefined;
  searchResultCounter = -1;

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.stichwort = this.route.snapshot.queryParams.stichwortfilter;
    if (!this.stichwort) {
      this.stichwort = '';
    }
    // this.myPLZ = this.route.snapshot.queryParams.plzfilter;
    // if (!this.myPLZ) {
    //   this.myPLZ = '';
    // }
    if (this.stichwort.length > 0) {
      this.searchBacktermine();
    }
  }

  searchBacktermine() {
    this.searchResultCounter = -1;
    // tslint:disable-next-line:max-line-length
    // this.withUmkreis = this.myPLZ.length > 0;

    // tslint:disable-next-line:max-line-length
    // so, an dieser Stelle möchte ich die Filter-Strings in den Query-Parametern abbilden, damit diese dann beim Back-Navigieren wieder aktiviert werden
    this.router.navigate([], {queryParams: {stichwortfilter: this.stichwort}});

    // tslint:disable-next-line:max-line-length
    this.lumaraService.doCommand(LumaraServiceCommands.SearchBacktermine(this.stichwort, this.umkreisDistance)).subscribe(
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
      return 'badge badge-danger';
    } else if (anzahlFrei < 5) {
      return 'badge badge-warning';
    }
    return 'text-mute';
  }

}
