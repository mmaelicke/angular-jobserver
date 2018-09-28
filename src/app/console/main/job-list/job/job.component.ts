import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from './job.interface';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MessageService} from '../../../shared/message/message.service';
import {ApiService} from '../../../shared/api.service';
import {ErrorResponse, MessageResponse} from '../../../shared/responses.interface';

@Component({
  selector: 'app-job, [job-tr]',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @Input() job: Job;
  @Input() viewStyle = 'table';
  // need  this deleted event, so that a parent component or list-component can refresh or navigate away
  @Output() deleted = new EventEmitter<boolean>();

  pending = false;
  // TODO: this is not a good name as jobRunning is true when the job run request is pending, not when the job is actually running
  // TODO: implement an automatic refresh function if job.started is not None but job.finished is None
  jobRunning = false;
  activeUserRole: string;

  constructor(private route: ActivatedRoute, private api: ApiService,
              private message: MessageService, private router: Router) { }

  ngOnInit() {
//    console.log(this.job);
    // if an id is given on the route, load that job
    const id = this.route.snapshot.paramMap.get('id');
    if (!id && !this.job) {
      this.message.error('[DEVELOPER]: There is no job_id route and no job binding.');
    }
    if (id) {
      // set to pending mode and change the default style
      this.pending = true;
      this.viewStyle = 'page';

      // request the Job an subscribe to url param changes
      this.api.getJob(id).subscribe(
        (job: Job) => {
          this.job = job;
          this.pending = false;
        }
      );
      // subscribe
      this.route.paramMap.subscribe(
        (params: Params) => {
          const id = params.get('id');
          this.api.getJob(id).subscribe(
            (job: Job) => {
              this.job = job;
              this.pending = false;
            }
          );
        },
        err => {
          // TODO: das hier noch abfangen
        }
      );
    }
  }

  onDeleteJob() {
    // set pending state
    this.pending = true;
    this.api.deleteJob(this.job._id).subscribe(
      (response: MessageResponse) => {
        this.pending = false;
        this.message.success(response.message, 'Job deleted.');
        this.deleted.emit(true);
      },
      (error: ErrorResponse) => {
        this.pending = false;
        this.message.error(error.message, 'Job deletion failed.');
      }
    );
  }

  onJobRun() {
    // indicate the job is running, until it needs to be reloaded
    this.jobRunning = true;
    this.api.runJob(this.job._id).subscribe(
      (job: Job) => {
        this.jobRunning = false;
        this.job = job;
      },
      (error: ErrorResponse) => {
        this.jobRunning = false;
        this.message.error(error.message, 'Job execution errored!');
      }
    );
    setTimeout(() => {this.jobRunning = false; }, 5000);
  }

  refresh() {
    this.pending = true;
    this.api.getJob(this.job._id).subscribe(
      (job: Job) => {
        this.pending = false;
        this.job = job;
      },
      (error: ErrorResponse) => {
        this.pending = false;
        this.message.error(error.message, 'Refresh failed');
      }
    );
  }

}
