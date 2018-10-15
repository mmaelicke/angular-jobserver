import {BehaviorSubject} from 'rxjs';

export class SettingsService {
  RESTnigmHost: BehaviorSubject<string>;
  jwtTimeout: BehaviorSubject<number>;

  constructor() {
    // DEV
    //this.RESTnigmHost = new BehaviorSubject<string>('https://api.openhydro.de');
    this.RESTnigmHost = new BehaviorSubject<string>('http://localhost:5000');
    //this.RESTnigmHost = new BehaviorSubject<string>('http://rest-nigma-test.us-east-1.elasticbeanstalk.com');
    //this.RESTnigmHost = new BehaviorSubject<string>('https://enigmams-217007.appspot.com');
    this.jwtTimeout = new BehaviorSubject<number>(4 * 60);  // seconds
  }
}
