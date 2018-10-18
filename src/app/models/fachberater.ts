import { BackterminProfilPageItem } from "./backtermine";

export class FachberaterListItem {
  ID: number;
  Name: string;
  PersonalNr: string;
  IsBZL: boolean;
  BZL: number;
  BZLName: string;
  IsGPL: boolean;
  GPL: number;
  GPLName: string;
  Telefon: string;
  Mobil: string;
  EMail: string;
}

export class FachberaterSucheListItem {
  ID: number;
  DOID: number;
  UserID: number;
  Name: string;
  PLZ: string;
  Ort: string;
  IsBZL: boolean;
  IsGPL: boolean;
  Distance: number;
}

export class FachberaterProfil {
  ID: number;
  UserID: number;
  Caption: string;
  BeraterSeit: Date;
  Anstellung: number;
  Strasse: string;
  Ort: string;
  Telefon: string;
  Mobil: string;
  EMail: string;
  Backtermine: BackterminProfilPageItem[];
}
