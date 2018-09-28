import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SettingsService} from '../console/shared/settings.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../console/shared/user.model';
import {TokenHeader} from '../console/shared/token-header.interface';
import {MessageService} from '../console/shared/message/message.service';

@Injectable()
export class AuthService {
  _user: User;
  _token: string;
  loggedIn: BehaviorSubject<boolean>;
  user: BehaviorSubject<User>;
  accessToken: BehaviorSubject<string>;
  tokenHeader: BehaviorSubject<TokenHeader>;
  url: string;

  constructor(private http: HttpClient, private settings: SettingsService, private message: MessageService) {
    // default status
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.user = new BehaviorSubject<User>((<User>{role: 'guest'}));
    this.accessToken = new BehaviorSubject<string>('');
    this.tokenHeader = new BehaviorSubject<TokenHeader>(this.getHeaderOptions());

    // subscribe to the REST API url
    this.settings.RESTnigmHost.subscribe(
      (newUrl: string) => {
        this.url = newUrl;
      }
    );

    // subscribe to user and accessToken subjects
    this.user.subscribe(
      (newUser: User) => {
        this._user = newUser;
      }
    );
    this.accessToken.subscribe(
      (token: string) => {
        this._token = token;
        console.log('Token: ' + this._token);

        // emit a new Header
        this.tokenHeader.next(this.getHeaderOptions());
      }
    );
  }

  getHeaderOptions(withCredentials= true, contentType= 'application/json'): TokenHeader {
    const options = {
    'Content-Type': contentType
    };
    if (withCredentials) {
      options['Authorization'] = 'Bearer ' + this._token;
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

  logout() {
    // update the status
    this.loggedIn.next(false);
    this.user.next(null);
    this.accessToken.next('');
  }

  registerUser(email: string, password: string) {
    // get Header without Credentials
    const httpOptions = this.getHeaderOptions(false);
    return this.http.put(this.url + '/user', {
      email: email,
      password: password
    }, httpOptions);
  }

  resendActivationLink(email: string) {
    // get Headers without Credentials
    const httpOptions = this.getHeaderOptions(false);
    return this.http.get(this.url + '/user/' + email + '/resend?activation', httpOptions);
  }

  resendPassword() {
    return this.message.info('Forgetting your password is really your problem. Joke aside: Not Implemented.', 'Sorry');
  }
}
