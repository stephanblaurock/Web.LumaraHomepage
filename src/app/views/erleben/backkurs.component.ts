import { BackterminPageModel, BackterminAnmeldung } from './../../models/backtermine';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-backkurs',
  templateUrl: './backkurs.component.html',
  styles: []
})
export class BackkursComponent implements OnInit {
  currentBackterminID = 0;
  currentBacktermin: BackterminPageModel = undefined;
  showButtonBuchungsformular = false;
  buchungsFormularVisible = false;
  showAusgebuchtText = false;

  myFormGroup: FormGroup;
  captcha_siteKey = '6LcJz3YUAAAAAJA_2bh9n2CuUcO8F1vM0hCxjQ0Y';
  captcha_size = 'normal';
  captcha_lang = 'de';
  captcha_theme = 'light';

  form_name = '';
  form_email = '';
  form_telefon = '';
  form_plz = '';
  form_teilnehmer_anzahl = 0;
  form_datenschutz = false;

  successtext = '';
  errortext = '';

  buttSendDisabled = true;
  inwork = false;

  constructor(private lumaraService: LumaraService,
    private router: Router,
    private route: ActivatedRoute, private mylocation: Location, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.currentBackterminID = +this.route.snapshot.queryParams.kursid;
    this.loadBackterminPageModel();
  }

  loadBackterminPageModel() {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBackterminPageModel(this.currentBackterminID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.currentBacktermin = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          if (!this.currentBacktermin.IsAusstellung) {
            this.showButtonBuchungsformular = this.currentBacktermin.MaxTeilnehmer > this.currentBacktermin.AnzahlTeilnehmer;
            this.showAusgebuchtText = this.currentBacktermin.AnzahlTeilnehmer >= this.currentBacktermin.MaxTeilnehmer;
          }
        } else if (data.ReturnCode >= 400) {
          console.log('Fehler aufgetreten');
          console.log(data);
          // notify('Fehler beim Laden des Backvortrags: ' + data.ReturnMessage);
          // this.router.navigate(['/login']);
        }
      });
  }

  captcha_handleExpire() {
    this.buttSendDisabled = true;
  }
  captcha_handleLoad() {

  }
  captcha_handleSuccess($event) {
    console.log('captcha-success:');
    console.log($event);
    this.buttSendDisabled = false;
  }

  showBuchungsFormular() {
    this.buchungsFormularVisible = true;
    this.showButtonBuchungsformular = false;
  }

  saveAnmeldung() {
    if (!this.form_datenschutz) {
      this.errortext = 'bitte Datenschutzbestimmungen akzeptieren.';
      return;
    }
    if (this.inwork) {
      return;   // keine Doppelbuchungen ermöglichen
    }
    this.inwork = true;
    this.successtext = '';
    this.errortext = '';
    const anmeldung = new BackterminAnmeldung();
    anmeldung.BackterminID = this.currentBackterminID;
    anmeldung.Name = this.form_name;
    anmeldung.EMail = this.form_email;
    anmeldung.Telefon = this.form_telefon;
    anmeldung.PLZ = this.form_plz;
    anmeldung.AnzahlTeilnehmer = this.form_teilnehmer_anzahl;

    this.lumaraService
    .doCommand(LumaraServiceCommands.UpdateBackterminAnmeldung(anmeldung, true))
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
      this.inwork = false;
    });
  }

  cancel() {
    this.mylocation.back();
  }
}
