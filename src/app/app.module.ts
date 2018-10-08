import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { WebpageComponent } from './webpage/webpage.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './home/login-form/login-form.component';
import {HttpClientModule} from '@angular/common/http';
import {SettingsService} from './console/shared/settings.service';
import {AuthService} from './shared/auth.service';
import { RegistrationFormComponent } from './home/registration-form/registration-form.component';
import { MessageComponent } from './console/shared/message/message.component';
import {MessageService} from './console/shared/message/message.service';
import { JobComponent } from './console/main/job-list/job/job.component';
import { JobListComponent } from './console/main/job-list/job-list.component';
import { DatafilesComponent } from './console/main/data/datafiles/datafiles.component';
import { DataFileComponent } from './console/main/data/datafiles/data-file/data-file.component';
import {ApiService} from './console/shared/api.service';
import { NavigationComponent } from './console/navigation/navigation.component';
import { MainComponent } from './console/main/main.component';
import { ScriptListComponent } from './console/main/script-list/script-list.component';
import { ScriptElementComponent } from './console/main/script-list/script-element/script-element.component';
import { JobFormComponent } from './console/main/job-form/job-form.component';
import { DashboardComponent } from './console/main/dashboard/dashboard.component';
import { JobEditPageComponent } from './console/main/job-edit-page/job-edit-page.component';
import { ResendFormComponent } from './home/resend/resend-form/resend-form.component';
import { ResendComponent } from './home/resend/resend.component';
import { ViewResultComponent } from './console/main/view-result/view-result.component';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import { DataComponent } from './console/main/data/data.component';
import { MongodbComponent } from './console/main/data/mongodb/mongodb.component';


@NgModule({
  declarations: [
    AppComponent,
    ConsoleComponent,
    WebpageComponent,
    HomeComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    MessageComponent,
    JobComponent,
    JobListComponent,
    DatafilesComponent,
    DataFileComponent,
    NavigationComponent,
    MainComponent,
    ScriptListComponent,
    ScriptElementComponent,
    JobFormComponent,
    DashboardComponent,
    JobEditPageComponent,
    ResendFormComponent,
    ResendComponent,
    ViewResultComponent,
    DataComponent,
    MongodbComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxJsonViewerModule,
  ],
  providers: [
    SettingsService,
    AuthService,
    MessageService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
