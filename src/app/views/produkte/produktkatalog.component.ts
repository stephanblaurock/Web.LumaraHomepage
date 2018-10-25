import { Component, OnInit } from '@angular/core';
import { ArtikelGruppe } from 'src/app/models/artikel';
import { Router, ActivatedRoute } from '@angular/router';
import { LumaraServiceCommands } from 'src/app/service/lumara_service_commands';
import { LumaraService } from 'src/app/service/lumara_service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produktkatalog',
  templateUrl: './produktkatalog.component.html',
  styles: []
})
export class ProduktkatalogComponent implements OnInit {
  artikelGroups: ArtikelGruppe[];

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.reloadArtikelGruppen();
  }

  private reloadArtikelGruppen() {
  this.lumaraService.doCommand(LumaraServiceCommands.GetArtikelgruppen()).subscribe(
    data => {
      if (data.ReturnCode === 200) {
        console.log('Ich bekam vom Server folgende Daten: ');
        console.log(data);
        // console.log(data.ReturnValue);
        this.artikelGroups = JSON.parse(data.ReturnValue);

      } else if (data.ReturnCode >= 400) {
        // this.router.navigate(['/login']);
        // (data.ReturnMessage);
        alert(data.ReturnMessage);
      }
    }
  );
  }

  getImageUrl(katid: number) {
    return 'https://portal.lumara.de/images/artikel/_Group' + katid + '.jpg';
  }
}
