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
