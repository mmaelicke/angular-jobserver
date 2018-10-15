import {Component, Input, OnInit} from '@angular/core';
import {DataObject} from './data-object.interface';

@Component({
  selector: 'app-data-object',
  templateUrl: './data-object.component.html',
  styleUrls: ['./data-object.component.css']
})
export class DataObjectComponent implements OnInit {
  @Input() data: DataObject;

  constructor() { }

  ngOnInit() {
  }

}
