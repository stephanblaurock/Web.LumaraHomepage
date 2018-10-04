import { FachberaterListItem, FachberaterSucheListItem } from './../../models/fachberater';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';

@Component({
  selector: 'app-fachberatersuche',
  templateUrl: './fachberatersuche.component.html',
  styles: []
})
export class FachberatersucheComponent implements OnInit {
  stichwort = '';
  withUmkreis = true;
  myPLZ = '';
  umkreisDistance = 80;
  fachberaterList: FachberaterSucheListItem[] = undefined;
  searchResultCounter = -1;

  constructor(private lumaraService: LumaraService, private router: Router) { }

  ngOnInit() {
  }

  searchFachberater() {
    this.searchResultCounter = -1;
    // tslint:disable-next-line:max-line-length
    this.withUmkreis = this.myPLZ.length > 0;
    this.lumaraService.doCommand(LumaraServiceCommands.SearchFachberater(this.stichwort, this.withUmkreis, this.myPLZ, this.umkreisDistance)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          console.log('Ich bekam vom Server folgende Daten: ');
          console.log(data);
          // console.log(data.ReturnValue);
          this.fachberaterList = JSON.parse(data.ReturnValue);
          this.searchResultCounter = this.fachberaterList.length > 0 ? 1 : 0;
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
}
