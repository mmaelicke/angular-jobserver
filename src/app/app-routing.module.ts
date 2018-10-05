import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {WebpageComponent} from './webpage/webpage.component';
import {ConsoleComponent} from './console/console.component';
import {JobListComponent} from './console/main/job-list/job-list.component';
import {JobComponent} from './console/main/job-list/job/job.component';
import {DatafilesComponent} from './console/main/datafiles/datafiles.component';
import {MainComponent} from './console/main/main.component';
import {ScriptListComponent} from './console/main/script-list/script-list.component';
import {JobFormComponent} from './console/main/job-form/job-form.component';
import {DashboardComponent} from './console/main/dashboard/dashboard.component';
import {JobEditPageComponent} from './console/main/job-edit-page/job-edit-page.component';
import {ResendComponent} from './home/resend/resend.component';
import {ViewResultComponent} from './console/main/view-result/view-result.component';

const appRoutes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'resend/:mode', component: ResendComponent},
  {path: 'web', component: WebpageComponent},
  {path: 'console', component: ConsoleComponent, children: [
      {path: '', component: DashboardComponent, pathMatch: 'full'},
      {path: 'job/new', component: JobFormComponent},
      {path: 'job/:id', component: JobComponent, pathMatch: 'full'},
      {path: 'job/:id/edit', component: JobEditPageComponent},
      {path: 'job/:id/result', component: ViewResultComponent},
      {path: 'datafiles', component: DatafilesComponent},
      {path: 'scripts', component: ScriptListComponent}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
