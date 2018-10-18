import { BackterminPageModel } from './../../models/backtermine';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';

@Component({
  selector: 'app-backkurs',
  templateUrl: './backkurs.component.html',
  styles: []
})
export class BackkursComponent implements OnInit {
  currentBackterminID = 0;
  currentBacktermin: BackterminPageModel = undefined;

  constructor(private lumaraService: LumaraService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentBackterminID = +this.route.snapshot.queryParams.kursid;
    this.loadBackterminPageModel();
  }

  loadBackterminPageModel() {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBackterminPageModel(this.currentBackterminID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          console.log('Ich bekam vom Server folgende Daten: ');
          console.log(data.ReturnValue);
          this.currentBacktermin = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
        } else if (data.ReturnCode >= 400) {
          console.log('Fehler aufgetreten');
          console.log(data);
          // notify('Fehler beim Laden des Backvortrags: ' + data.ReturnMessage);
          // this.router.navigate(['/login']);
        }
      });
  }
}
