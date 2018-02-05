import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from '../pages/about/about';
import { ListPage } from '../pages/list/list';
import { AddPage } from '../pages/add/add';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage} from '../pages/login/login';
import { MarkattendencePage } from '../pages/markattendence/markattendence';
import { StudentdetailsPage } from '../pages/studentdetails/studentdetails';
import { SettingsPage } from '../pages/settings/settings';
import { StartedStudentsPage } from '../pages/started-students/started-students';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { SearchPipe } from '../pipes/search/search';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ListPage,
    AddPage,
    TabsPage,
    LoginPage,
    SettingsPage,
    StartedStudentsPage,
    MarkattendencePage,
    StudentdetailsPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    IonicPageModule.forChild(MarkattendencePage),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ListPage,
    AddPage,
    TabsPage,
    LoginPage,
    SettingsPage,
    StartedStudentsPage,
    StudentdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider
  ]
})
export class AppModule {}
