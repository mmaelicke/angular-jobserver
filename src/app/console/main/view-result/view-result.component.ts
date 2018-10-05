import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Job} from '../job-list/job/job.interface';
import {ApiService} from '../../shared/api.service';
import {ErrorResponse} from '../../shared/responses.interface';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  job: Job;
  error: ErrorResponse;
  result: any;

  constructor(private route: ActivatedRoute, private api: ApiService) {
    // get the actual job
    this.api.getJob(this.route.snapshot.paramMap.get('id')).subscribe(
      (job: Job) => {
        this.job = job;
        this.parseResult();
        },
      (error: ErrorResponse) => { this.error = error; }
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.api.getJob(params['id']).subscribe(
          (job: Job) => {
            this.job = job;
            this.parseResult();
            },
        (error: ErrorResponse) => { this.error = error; }
        );
      }
    );
  }

  private parseResult() {
    if (!this.job.result) {
      this.error = <ErrorResponse>{status: 405, message: 'No result object found.'};
    } else {
      this.result = this.job.result;
    }
  }
  ngOnInit() {
  }

}
