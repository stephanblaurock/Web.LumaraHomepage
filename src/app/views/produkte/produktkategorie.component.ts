import { ArtikelItem } from './../../models/artikel';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from 'src/app/service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LumaraServiceCommands } from 'src/app/service/lumara_service_commands';

@Component({
  selector: 'app-produktkategorie',
  templateUrl: './produktkategorie.component.html',
  styles: []
})
export class ProduktkategorieComponent implements OnInit {
  artikelGruppeID = 999;
  artikelGruppeCaption = 'asd';
  artikelItems: ArtikelItem[];

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.artikelGruppeID = +this.route.snapshot.queryParams.artikelgruppeid;
    this.reloadArtikelGruppe();
  }

  private reloadArtikelGruppe() {
    if (this.artikelGruppeID === 999) {
      return;
    }

    this.artikelGruppeCaption = this.getArtikelGruppeCaption(this.artikelGruppeID);

    this.lumaraService.doCommand(LumaraServiceCommands.GetArtikel(1, true, false, false, this.artikelGruppeID, new Date(1800,1,1), true)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data);
          console.log(data.ReturnValue);
          this.artikelItems = JSON.parse(data.ReturnValue);

        } else if (data.ReturnCode >= 400) {
          // this.router.navigate(['/login']);
          // (data.ReturnMessage);
          alert(data.ReturnMessage);
        }
      }
    );
    }

    getImageUrl(edvnr: string) {
      return 'https://portal.lumara.de/images/artikel/thumbs150/' + edvnr + '.jpg';
    }
    imgErrorHandler(event) {
      event.target.src = '/assets/products/empty.png';
    }

    getArtikelGruppeCaption(aid: number): string {
      if (aid === 10) {
        return 'Back-Sets';
      } else if (aid === 20) {
        return 'Backformen';
      } else if (aid === 30) {
        return 'Backzubehör';
      } else if (aid === 40) {
        return 'Garnieren';
      } else if (aid === 50) {
        return 'Küchenprogramm';
      } else if (aid === 60) {
        return 'Lebensmittel';
      } else if (aid === 70) {
        return 'Backbücher';
      } else if (aid === 90) {
        return 'Sonstiges';
      }
      return '';
    }
}
