export class ArtikelGruppe {
  ID: number;
  Caption: string;
  Kuerzel: string[];
}

export class ArtikelItem {
  ID: number;
  EdvNr: string;
  Bezeich: string;
  PreisVK_EU: number;
  PreisSonder_EU: number;
  NichtLieferbar: boolean;
}
