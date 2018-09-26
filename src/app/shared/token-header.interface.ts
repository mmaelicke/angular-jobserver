import {HttpHeaders} from '@angular/common/http';

export interface TokenHeader {
  headers: HttpHeaders;
  withCredentials?: boolean;
}
