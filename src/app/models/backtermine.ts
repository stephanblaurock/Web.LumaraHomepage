export class BackterminItem {
  PersonalakteID: number;
  ID: number;
  Caption: string;
  DateBegin: Date;
  Ort: string;
  AnzahlTeilnehmer: number;
}

export class Backtermin {
  PersonalakteID: number;
  ID: number;
  UserID: number;
  Caption: string;
  DateBegin: Date;
  DateEnd: Date;
  Dauer: string;
  Kosten: number;
  OrtID: number;
  MaxTeilnehmer: number;
}

export class BackterminAnmeldung {
  ID: number;
  BackterminID: number;
  Name: string;
  Telefon: string;
  EMail: string;
  PLZ: string;
  AnzahlTeilnehmer: number;
  IsStorniert: boolean;
}

export class BackterminOrt {
  ID: number;
  Strasse: string;
  PLZ: string;
  Ort: string;
  Caption: string;
  GeoLat: number;
  GeoLng: number;
}
