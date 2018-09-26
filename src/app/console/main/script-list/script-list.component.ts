import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {ScriptElement} from './script-element/script-element.interface';

@Component({
  selector: 'app-script-list',
  templateUrl: './script-list.component.html',
  styleUrls: ['./script-list.component.css']
})
export class ScriptListComponent implements OnInit {
  scripts: ScriptElement[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    // subscribe to script-elements
    this.api.getScripts().subscribe(
      (response: {found: number, scripts: ScriptElement[]}) => {
        this.scripts = response.scripts;
      }
    );
  }

}
