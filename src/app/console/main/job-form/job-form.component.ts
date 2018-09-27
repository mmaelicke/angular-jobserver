import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../job-list/job/job.interface';
import {ApiService} from '../../shared/api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ScriptElement} from '../script-list/script-element/script-element.interface';
import {DataFile} from '../datafiles/data-file/data-file.interface';
import {ErrorResponse} from '../../shared/responses.interface';
import {MessageService} from '../../shared/message/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  @Input() job: Job;
  editMode: boolean;

  // build the Form contollers
  addDataFile = false;
  addScript = false;

  // scripts and dataFiles
  allScripts: ScriptElement[] = [];
  allDataFiles: DataFile[] = [];

  // build the Form modules
  datafileControl = new FormControl(this.editMode ? this.job.data.name : '');
  scriptControl = new FormControl(this.editMode ? this.job.script.name : '');
  jobForm = new FormGroup({
    data: this.datafileControl,
    script: this.scriptControl
  });

  constructor(private api: ApiService, private message: MessageService, private router: Router) {
  }

  ngOnInit() {
    // check whether edit Mode is active
    this.editMode = !!this.job;

    this.api.getScripts().subscribe(
      (response: {found: number, scripts: ScriptElement[]}) => {
        this.allScripts = response.scripts;
      }
    );
    this.api.getDataFiles().subscribe(
      (response: {found: number, files: DataFile[]}) => {
        this.allDataFiles = response.files;
      }
    );
  }

  onSubmit() {
    // console.log(this.jobForm);
    if(this.editMode) {
      this.onEditJob();
    } else {
      this.onCreateJob();
    }
  }

  private buildData() {
    // generate a request data JSON object
    const data = {};
    if (this.scriptControl.value) {
      data['script_name'] = this.scriptControl.value;
    }
    if (this.datafileControl.value) {
      data['datafile'] = this.datafileControl.value;
    }

    return data;
  }

  private onCreateJob() {
    const data = this.buildData();
    this.api.createJob(data).subscribe(
      (job: Job) => {
        this.message.success('Created new Job of ID: ' + job._id, 'Job created');
        this.router.navigate(['console', 'job', job._id]);
      },
      (error: ErrorResponse) => {
        this.message.error('The Job creation failed.<br>' + error.message, 'Job creation failed.');
      }
    );
  }

  private onEditJob() {
    const data = this.buildData();
    this.api.editJob(this.job._id, data).subscribe(
      (job: Job) => {
        this.message.success('Edited Job ID: ' + this.job._id, 'Edit successfull');
        this.router.navigate(['console', 'job', this.job._id]);
      }
    );
  }
}
