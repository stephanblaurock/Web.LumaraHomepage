import { JsonCommand } from '../utils/json/json-command';
import { BackterminAnmeldung } from '../models/backtermine';

export class LumaraServiceCommands {
  public static SearchBacktermine(plz: string, ort: string): JsonCommand {
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.BaseService';
    cmd.CommandName = 'SearchBacktermine';
    cmd.addParameter('PLZ', plz);
    cmd.addParameter('Ort', ort);
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
