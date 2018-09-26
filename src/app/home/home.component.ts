import { Component, OnInit } from '@angular/core';
import {AppContent} from '../app.content';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  extends AppContent implements OnInit {
  formLoaded = '';

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
