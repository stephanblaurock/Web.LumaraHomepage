import {Subject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {JsonCommand} from '../utils/json/json-command';
import {LumaraServiceCommands} from './lumara_service_commands';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class LumaraService {
  public url_zentrale = 'https://service.lumara.de/cmd?jsoncommand';
  public url_zentrale_min = 'https://service.lumara.de';
  // public url_zentrale = 'http://localhost:8990/cmd?jsoncommand';
  // public url_zentrale_min = 'http://localhost:8990';

  private current_user_name = 'hpuser';
  private current_token = 'ä3##45?%$§$';
  private current_headline = '';
  private current_headline_state = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {

  }

  doRequestGet(url: string): Observable<string> {
    // const body = JSON.stringify(data);
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(url, {responseType: 'text'});
  }

  doRequest(url: string, data: any): Observable<string> {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(url, body, {headers: headers});
  }

  doCommand(cmd: JsonCommand): Observable<any> {
    // der user und der token wird immer mitgeliefert
    cmd.addParameter('user', this.current_user_name);
    cmd.addParameter('token', this.current_token);
    const body = cmd.toJson();
    console.log('Command wird gesendet: ' + body);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.url_zentrale, body, {headers: headers});
  }

  getUserImageUrl(userid: number) {
    // const retval = this.url_zentrale + '&modulename=Modules.Users.Service.UserService&commandname=GetUserImage&user_id=' + userid + '&UserImageSize=0';
    const retval = 'https://onlineservice.lumara.de:443/imagecontroller/userimages/' + userid + '.jpg';
    return retval;
  }

  setHeadline(headlineCaption: string) {
    this.current_headline = headlineCaption;
    this.current_headline_state.next(this.current_headline.length > 0 ? this.current_headline : '');
  }

  getCurrentHeadlineObservable() {
    return this.current_headline_state.asObservable();
  }

}
