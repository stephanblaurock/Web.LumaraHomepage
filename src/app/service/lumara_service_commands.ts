import { JsonCommand } from '../utils/json/json-command';
import { BackterminAnmeldung } from '../models/backtermine';

export class LumaraServiceCommands {
  public static SearchFachberater(stichwort: string, withUmkreis: boolean, myPLZ: string, umkreisDistance: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'SearchFachberater';
    cmd.addParameter('Stichwort', stichwort);
    cmd.addParameter('WithUmkreis', withUmkreis);
    cmd.addParameter('MyPLZ', myPLZ);
    cmd.addParameter('UmkreisDistance', umkreisDistance);
    return cmd;
  }
  public static SearchBacktermine(stichwort: string, withUmkreis: boolean, myPLZ: string, umkreisDistance: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'SearchBacktermine';
    cmd.addParameter('Stichwort', stichwort);
    cmd.addParameter('WithUmkreis', withUmkreis);
    cmd.addParameter('MyPLZ', myPLZ);
    cmd.addParameter('UmkreisDistance', umkreisDistance);
    return cmd;
  }
  public static GetFachberaterProfilPageModel(personalakteID: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetFachberaterProfilPageModel';
    cmd.addParameter('PersonalakteID', personalakteID);
    return cmd;
  }
  public static UpdateBackterminAnmeldung(anmeldung: BackterminAnmeldung): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'UpdateBackterminAnmeldung';
    cmd.addParameter('BackterminAnmeldung', anmeldung);
    return cmd;
  }
  public static GetBackterminPageModel(backterminID: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetBackterminPageModel';
    cmd.addParameter('BackterminID', backterminID );
    return cmd;
  }
  public static GetBlogPost(blogPostID: number): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Blogging.Service.BlogService';
    cmd.CommandName = 'GetBlogPost';
    cmd.addParameter('BlogPostID', blogPostID);
    return cmd;
  }
  public static GetArtikelgruppen(): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetArtikelgruppen';
    return cmd;
  }
  public static GetArtikel(idMandant: number, showOnlineFilter: boolean, nichtLieferbarFilter: boolean, sonderpreisFilter: boolean,
      artikelGruppe: number, changedSince: Date, returnLightObjects: boolean): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'GetArtikel';
    cmd.addParameter('IDMandant', idMandant);
    cmd.addParameter('ShowOnlineFilter', showOnlineFilter);
    cmd.addParameter('NichtLieferbarFilter', nichtLieferbarFilter);
    cmd.addParameter('SonderpreisFilter', sonderpreisFilter);
    cmd.addParameter('ArtikelGruppe', artikelGruppe);
    cmd.addParameter('ChangedSince', changedSince);
    cmd.addParameter('ReturnLightObjects', returnLightObjects);
    return cmd;
  }
}
