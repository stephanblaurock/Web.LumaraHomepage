import { FachberaterListItem, FachberaterSucheListItem } from './../../models/fachberater';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.stichwort = this.route.snapshot.queryParams.stichwortfilter;
    if (!this.stichwort) {
      this.stichwort = '';
    }
    this.myPLZ = this.route.snapshot.queryParams.plzfilter;
    if (!this.myPLZ) {
      this.myPLZ = '';
    }
    if (this.stichwort.length > 0 || this.myPLZ.length > 0) {
      this.searchFachberater();
    }
  }

  searchFachberater() {
    this.searchResultCounter = -1;
    // tslint:disable-next-line:max-line-length
    this.withUmkreis = this.myPLZ.length > 0;
    // so, an dieser Stelle möchte ich die Filter-Strings in den Query-Parametern abbilden, damit diese dann beim Back-Navigieren wieder aktiviert werden
    this.router.navigate([], {queryParams: {plzfilter: this.myPLZ, stichwortfilter: this.stichwort}});

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

  imgErrorHandler(event) {
    event.target.src = '/assets/firma/empty_with_border.png';
  }
}
