import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {User} from '../../console/shared/user.model';
import {ErrorResponse} from '../../shared/responses.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Error} from 'tslint/lib/error';
import {Router} from '@angular/router';
import {MessageService} from '../../console/shared/message/message.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;
  message = '';
  pending = false;

  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.pending = true;
    this.auth.login(this.email, this.password).subscribe(
      (response: {user: User, access_token: string}) => {
        // dev only
//        this.message = 'Redirecting...';

        // update the auth service
        this.auth.loggedIn.next(true);
        this.auth.accessToken.next(response.access_token);
        this.auth.user.next(response.user);

        console.log(this.auth.user.getValue());
        this.messageService.success('Welcome back!', 'Login successful');

        this.router.navigate(['console']);
      },
      (error: HttpErrorResponse) => {
        // get the REST-nigma specific errors
        let err: ErrorResponse;
        if (error.error) {
          err = error.error;
        } else {
          console.log('Error not originating from REST-nigma');
          err = {status: error.status, message: error.statusText};
        }

        // switch the error messages
        if (err.status === 409) {
          this.message = 'You are not activated yet. Please check your mails.';
        } else {
          this.message = err.message;
        }
        // update the auth service
        this.auth.loggedIn.next(false);
        this.pending = false;
      }
    );
  }
}
