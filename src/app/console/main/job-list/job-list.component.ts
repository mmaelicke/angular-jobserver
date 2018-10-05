import {Component, Input, OnInit} from '@angular/core';
import {Job} from './job/job.interface';
import {ApiService} from '../../shared/api.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];

  // set a filter using setter, to refresh the Job list
  filterValue = 'all';
  @Input()
  get filter() {
    return this.filterValue;
  }
  set filter(value: string) {
    this.filterValue = value;
    this.refreshJobs();
  }

  constructor(private api: ApiService) { }

  ngOnInit() {
    // get the list of Jobs
    this.refreshJobs();
  }

  refreshJobs() {
    let apiEndpoint: Function;
    switch (this.filterValue) {
      case 'finished':
        apiEndpoint = this.api.getFinishedJobs.bind(this.api);
        break;
      case 'pending':
        apiEndpoint = this.api.getPendingJobs.bind(this.api);
        break;
      case 'notStarted':
        apiEndpoint = this.api.getNotStartedJobs.bind(this.api);
        break;
      default:
        apiEndpoint = this.api.getJobs.bind(this.api);
    }

    // subscribe to the correct endpoint
    apiEndpoint().subscribe(
      (result: {found: number, jobs: Job[]}) => {
        this.jobs = result.jobs;
      }
    );
  }

}
