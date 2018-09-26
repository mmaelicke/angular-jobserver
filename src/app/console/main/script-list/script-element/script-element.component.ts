import {Component, Input, OnInit} from '@angular/core';
import {ScriptElement} from './script-element.interface';

@Component({
  selector: 'app-script-element',
  templateUrl: './script-element.component.html',
  styleUrls: ['./script-element.component.css']
})
export class ScriptElementComponent implements OnInit {
  @Input() script: ScriptElement;

  constructor() { }

  ngOnInit() {
  }

}
