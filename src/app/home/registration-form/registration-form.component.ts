import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {ErrorResponse} from '../../shared/responses.interface';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from '../../console/shared/message/message.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  message = '';
  pending = false;

  emails = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    emailConfirm: new FormControl('', [Validators.required, Validators.email])
  });
  passwords = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, [this.passwordMatchValidator]);
  registrationForm = new FormGroup({
    emails: this.emails,
    passwords: this.passwords
  });

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
  }
  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.pending = true;
    this.auth.registerUser(this.emails.get('email').value, this.passwords.get('password').value).subscribe(
      (response: {status: number, message: string}) => {
        this.messageService.success(response.message, 'Registration successfull');
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.pending = false;
        let err: ErrorResponse;
        if (error.error) {
          err = error.error;
        } else {
          err = {status: error.status, message: error.statusText}
        }
        this.message = err.message;
      }
    );
  }
}
