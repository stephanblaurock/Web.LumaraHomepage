import { Component, OnInit } from '@angular/core';
import { LumaraService } from 'src/app/service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { LumaraServiceCommands } from 'src/app/service/lumara_service_commands';

@Component({
  selector: 'app-kontaktformular',
  templateUrl: './kontaktformular.component.html',
  styles: []
})
export class KontaktformularComponent implements OnInit {
  form_name = '';
  form_email = '';
  form_telefon = '';
  form_content = '';
  form_datenschutz = false;

  errortext = '';
  successtext = '';

  constructor(private lumaraService: LumaraService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  sendMessage() {
    if (!this.form_datenschutz) {
      this.errortext = 'bitte Datenschutzbestimmungen akzeptieren.';
      return;
    }
    if (!this.form_name) {
      this.errortext = 'bitte Ihren Namen angeben.';
      return;
    }
    if (!this.form_email) {
      this.errortext = 'bitte Ihre E-Mail-Adresse angeben.';
      return;
    }
    if (!this.form_content) {
      this.errortext = 'bitte den Nachrichtentext ausfüllen.';
      return;
    }
    this.errortext = '';
    this.successtext = '';

    this.lumaraService
    .doCommand(LumaraServiceCommands.SendKontaktformular(this.form_name, this.form_email, this.form_telefon, this.form_content))
    .subscribe(data => {
      if (data.ReturnCode === 200) {
        console.log('Ich bekam vom Server folgende Daten: ');
        console.log(data.ReturnValue);
        this.successtext = data.ReturnMessage;
      } else if (data.ReturnCode >= 400) {
        console.log('Fehler aufgetreten');
        console.log(data);
        this.errortext = data.ReturnMessage;
        // notify('Fehler beim Laden des Backvortrags: ' + data.ReturnMessage);
        // this.router.navigate(['/login']);
      }
    });
  }
}
