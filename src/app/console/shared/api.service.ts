import {Injectable, OnDestroy} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {SettingsService} from './settings.service';
import {Subscription} from 'rxjs';
import {TokenHeader} from './token-header.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService implements OnDestroy {
  url: string;
  urlSubscription: Subscription;
  authHeader: TokenHeader;
  authHeaderSubscription: Subscription;

  constructor(private auth: AuthService, private settings: SettingsService, private http: HttpClient) {
    // subscribe to the HOST
    this.urlSubscription = this.settings.RESTnigmHost.subscribe(
      (newUrl: string) => {this.url = newUrl; }
    );
    this.url = this.settings.RESTnigmHost.getValue();

    // subscribe to Authorization header
    this.authHeaderSubscription = this.auth.tokenHeader.subscribe(
      (header: TokenHeader) => { this.authHeader = header; }
    );
    this.authHeader = this.auth.tokenHeader.getValue();
  }

  /* -------------------------------------------------------------------------------------
  * Job Endpoint API
  * -------------------------------------------------------------------------------------*/
  getJobs() {
    return this.http.get(this.url + '/jobs', this.authHeader);
  }

  getJob(id: string) {
    return this.http.get(this.url + '/job/' + id, this.authHeader);
  }

  createJob(data: {[x: string]: any}, id?: string) {
    if (id){
      return this.http.put(this.url + '/job/' + id, data, this.authHeader);
    } else {
      return this.http.put(this.url + '/job', data, this.authHeader);
    }
  }

  editJob(id: string, data) {
    return this.http.post(this.url + '/job/' + id, data, this.authHeader);
  }

  deleteJob(id: string) {
    return this.http.delete(this.url + '/job/' + id, this.authHeader);
  }

  runJob(id: string) {
    return this.http.get(this.url + '/job/' + id + '/run', this.authHeader)
  }

  /* -------------------------------------------------------------------------------------
  * Datafile Endpoint API
  * -------------------------------------------------------------------------------------*/
  getDataFiles() {
    return this.http.get(this.url + '/datafiles', this.authHeader);
  }

  /* -------------------------------------------------------------------------------------
  * Scripts Endpoint API
  * -------------------------------------------------------------------------------------*/
  getScripts() {
    return this.http.get(this.url + '/scripts', this.authHeader);
  }

  ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }
}
