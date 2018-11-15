export class ArtikelGruppe {
  ID: number;
  Caption: string;
  Kuerzel: string[];
}

export class ArtikelItem {
  ID: number;
  EdvNr: string;
  Bezeich: string;
  PreisVK_D: number;
  PreisSonder_D: number;
  NichtLieferbar: boolean;
}
