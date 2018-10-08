import {Component, Input, OnInit} from '@angular/core';
import {DataFile} from './data-file.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-data-file',
  templateUrl: './data-file.component.html',
  styleUrls: ['./data-file.component.css']
})
export class DataFileComponent implements OnInit {
  @Input() datafile: DataFile;

  constructor() { }

  ngOnInit() {
  }

}
