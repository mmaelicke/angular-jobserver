import { Component, OnInit } from '@angular/core';
import {DataObject} from './data-object/data-object.interface';
import {ApiService} from '../../../shared/api.service';

@Component({
  selector: 'app-mongodb',
  templateUrl: './mongodb.component.html',
  styleUrls: ['./mongodb.component.css']
})
export class MongodbComponent implements OnInit {
  dataObjects: DataObject[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDataObjects().subscribe(
      (response: {status: number, found: number, data: DataObject[]}) => {
        this.dataObjects = response.data;
      }
    );
  }

}
