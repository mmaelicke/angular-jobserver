import {Component, Input, OnInit} from '@angular/core';
import {Job} from './job.interface';
import {ActivatedRoute, Params} from '@angular/router';
import {MessageService} from '../../../shared/message/message.service';
import {ApiService} from '../../../shared/api.service';
import {AuthService} from '../../../../shared/auth.service';
import {User} from '../../../shared/user.model';

@Component({
  selector: 'app-job, [job-tr]',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @Input() job: Job;
  @Input() viewStyle = 'table';
  pending = false;
  activeUserRole: string;

  constructor(private route: ActivatedRoute, private api: ApiService,
              private message: MessageService, private auth: AuthService) { }

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

}
