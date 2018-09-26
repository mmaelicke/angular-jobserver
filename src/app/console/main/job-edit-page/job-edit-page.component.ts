import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../shared/api.service';
import {Job} from '../job-list/job/job.interface';

@Component({
  selector: 'app-job-edit-page',
  templateUrl: './job-edit-page.component.html',
  styleUrls: ['./job-edit-page.component.css']
})
export class JobEditPageComponent implements OnInit {
  job: Job;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getJob(id).subscribe(
        (job: Job) => {
          this.job = job;
        }
      );
    }
  }

}
