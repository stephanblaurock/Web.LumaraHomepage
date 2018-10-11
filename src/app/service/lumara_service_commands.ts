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
  public static UpdateBackterminAnmeldung(anmeldung: BackterminAnmeldung): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'UpdateBackterminAnmeldung';
    cmd.addParameter('BackterminAnmeldung', anmeldung);
    return cmd;
  }

}
