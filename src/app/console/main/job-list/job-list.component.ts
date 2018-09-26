import { Component, OnInit } from '@angular/core';
import {Job} from './job/job.interface';
import {ApiService} from '../../shared/api.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    // get the list of Jobs
    this.refreshJobs();
  }

  refreshJobs() {
    this.api.getJobs().subscribe(
      (result: {found: number, jobs: Job[]}) => {
        this.jobs = result.jobs;
      }
    );
  }

}
