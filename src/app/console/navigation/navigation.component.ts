import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {MessageService} from '../shared/message/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  dataMenuCollapsed = true;

  constructor(private auth: AuthService, private message: MessageService, private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.auth.logout();
    this.message.info('You are logged out now.', 'Logout', true, 10000);
    this.router.navigate(['/']);
  }

}
