import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/auth.service';
import {MessageService} from '../../../console/shared/message/message.service';
import {ErrorResponse, MessageResponse} from '../../../console/shared/responses.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-resend-form',
  templateUrl: './resend-form.component.html',
  styleUrls: ['./resend-form.component.css']
})
export class ResendFormComponent implements OnInit {
  @Input() mode: string;
  email = '';
  pending = false;

  constructor(private auth: AuthService, private message: MessageService, private router: Router) {
  }

  ngOnInit() {
    if (!this.mode) {
      this.message.error('[DEVELOPER]: Don\'t know what to resend here. That\'s a problem. ');
    }
  }

  onSubmit() {
    this.pending = true;
    // switch the mode
    if (this.mode === 'activation') {
      this.auth.resendActivationLink(this.email).subscribe(
        (response: MessageResponse) => {
          this.pending = false;
          this.message.success(response.message, 'Resend activation code.');
          this.router.navigate(['/']);
        },
        (error: ErrorResponse) => {
          this.pending = false;
          this.message.error(error.message, 'Mail sending failed');
        }
      );
    } else {
      // this is not finished yet
      this.auth.resendPassword();
    }
  }

}
