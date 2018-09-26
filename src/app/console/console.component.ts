import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {User} from './shared/user.model';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  user: User;
  token: string;

  constructor(private auth: AuthService) {
    this.auth.user.subscribe(
      user => { this.user = user; }
    );
    this.auth.accessToken.subscribe(
      token => {this.token = token; }
    );
  }

  ngOnInit() {
  }

}
