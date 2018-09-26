import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SettingsService} from '../console/shared/settings.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../console/shared/user.model';
import {ErrorResponse} from './responses.interface';
import {TokenHeader} from './token-header.interface';

@Injectable()
export class AuthService {
  loggedIn: BehaviorSubject<boolean>;
  user: BehaviorSubject<User>;
  accessToken: BehaviorSubject<string>;
  tokenHeader: BehaviorSubject<TokenHeader>;

  constructor(private http: HttpClient, private settings: SettingsService) {
    // default status
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<User>((<User>{role: 'guest'}));
    this.accessToken = new BehaviorSubject<string>('');
    this.tokenHeader = new BehaviorSubject<TokenHeader>(this.getHeaderOptions());
  }

  getHeaderOptions(withCredentials= true, contentType= 'application/json'):TokenHeader {
    const options = {
    'Content-Type': contentType
    };
    if (withCredentials) {
      options['Authorization'] = 'Bearer ' + this.accessToken.getValue();
    }

    const httpOptions = {
      headers: new HttpHeaders(options)
    };

    if (withCredentials) {
      httpOptions['withCredentials'] = true;
    }

    return httpOptions;
  }

  login(email: string, password: string) {
    // build HEADERS
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(email + ':' + password)
      })
    };
    return this.http.get(this.settings.RESTnigmHost.getValue() + '/login', httpOptions);
  }

  registerUser(email: string, password: string) {
//    const httpOptions = {
//      headers: new HttpHeaders({
//        'Content-Type': 'application/json'
//      })
//    };
    const httpOptions = this.getHeaderOptions(false);
    return this.http.put(this.settings.RESTnigmHost.getValue() + '/user', {
      email: email,
      password: password
    }, httpOptions);
  }
}
