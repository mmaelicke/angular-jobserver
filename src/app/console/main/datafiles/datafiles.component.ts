import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {DataFile} from './data-file/data-file.interface';

@Component({
  selector: 'app-datafiles',
  templateUrl: './datafiles.component.html',
  styleUrls: ['./datafiles.component.css']
})
export class DatafilesComponent implements OnInit {
  datafiles: DataFile[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDataFiles().subscribe(
      (response: {found: number, files: DataFile[]}) => {
        this.datafiles = response.files;
      }
    );
  }

}
