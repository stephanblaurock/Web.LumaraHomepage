import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import {NgbModule, NgbCollapseModule, NgbCarousel, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { BacksystemComponent } from './views/backsystem/backsystem.component';
import { UeberUnsComponent } from './views/firma/ueber-uns.component';
import { SchokolaedleComponent } from './views/firma/schokolaedle.component';
import { EngagementComponent } from './views/firma/engagement.component';
import { ProduktkatalogComponent } from './views/produkte/produktkatalog.component';
import { ProduktkategorieComponent } from './views/produkte/produktkategorie.component';
import { ProduktComponent } from './views/produkte/produkt.component';
import { BackkurseComponent } from './views/erleben/backkurse.component';
import { GastgeberComponent } from './views/erleben/gastgeber.component';
import { TeammitgliedComponent } from './views/erleben/teammitglied.component';
import { FachberatersucheComponent } from './views/erleben/fachberatersuche.component';
import { KontaktformularComponent } from './views/firma/kontaktformular.component';
import { RezepteComponent } from './views/rezepte/rezepte.component';
import { RezeptComponent } from './views/rezepte/rezept.component';
import { ImpressumComponent } from './views/allgemein/impressum.component';
import { DatenschutzComponent } from './views/allgemein/datenschutz.component';
import { LumaraService } from './service/lumara_service';
import { FachberaterProfilComponent } from './views/erleben/fachberater-profil.component';
import { BackkursComponent } from './views/erleben/backkurs.component';
import { BlogPostComponent } from './views/allgemein/blog-post.component';

registerLocaleData(localeDe);

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'backsystem', component: BacksystemComponent},
  {path: 'ueberuns', component: UeberUnsComponent},
  {path: 'produktkatalog', component: ProduktkatalogComponent},
  {path: 'backkurse', component: BackkurseComponent},
  {path: 'backkurs', component: BackkursComponent},
  {path: 'fachberatersuche', component: FachberatersucheComponent},
  {path: 'fachberater', component: FachberaterProfilComponent},
  {path: 'gastgeber', component: GastgeberComponent},
  {path: 'teammitglied', component: TeammitgliedComponent},
  {path: 'rezepte', component: RezepteComponent},
  {path: 'rezept', component: RezeptComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BacksystemComponent,
    UeberUnsComponent,
    SchokolaedleComponent,
    EngagementComponent,
    ProduktkatalogComponent,
    ProduktkategorieComponent,
    ProduktComponent,
    BackkurseComponent,
    GastgeberComponent,
    TeammitgliedComponent,
    FachberatersucheComponent,
    KontaktformularComponent,
    RezepteComponent,
    RezeptComponent,
    ImpressumComponent,
    DatenschutzComponent,
    FachberaterProfilComponent,
    BackkursComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    NgbModule.forRoot(),
    NgbCollapseModule,
    NgbCarouselModule
  ],
  providers: [LumaraService, {
    provide: LOCALE_ID,
    useValue: 'de-DE'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
