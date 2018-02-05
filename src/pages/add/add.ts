import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {App} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  addStudentForm: FormGroup;
  sName: string;
  sUsn: string;
  sRoll: string;
  sAttended: string;
  sTotal: string;
  result: any;
  sSubject: string;
  sStar: boolean;
  toggler: boolean;

  //from properties
  sNameF: string = '';
  sUsnF: string = '';
  subNameF: string = '';
  sRollF: string = '';
  sAttendedF: string = '';
  sTotalF:string = '';

  constructor(private app: App,public navCtrl: NavController, public navParams: NavParams, public servi: StorageProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,public formBuilder: FormBuilder) {
    this.sName = '';
    this.sUsn = '';
    this.sAttended = '';
    this.sRoll = '';
    this.sTotal = '';
    this.sAttended = '';
    this.sSubject = '';
    this.sStar = false;
    this.toggler = false;
    this.navCtrl = navCtrl;

    this.addStudentForm = formBuilder.group({

      'sNameF': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]*')])],
      'subNameF': ['', Validators.compose([Validators.required,  Validators.pattern('[a-zA-Z]*')])],
      'sUsnF': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*')])],
      'sRollF': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      'sAttendedF': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      'sTotalF': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])]
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddPage');
  }
  onSubmit(){
    let toast = this.toastCtrl.create(
      {
          message: 'Record were successfully added to Database',
          duration: 3000,
          position: 'bottom'
    });

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Adding record to Database. Please wait...'
    });

      //console.log("...Form submitted...");
      var newStudent = {
        sName: this.sName,
        sUsn: this.sUsn,
        sSubject: this.sSubject,
        sRoll: this.sRoll,
        sAttended: this.sAttended,
        sTotal: this.sTotal,
        sStar: this.sStar,
        toggler: this.toggler,
        presentDates: [],
        absentDates: []
      }
      let list: any;
      loading.present();
      this.servi.getList().then( data => {
        list = data;
        if(list == null)
          list = [];
        list.push(newStudent);
        this.servi.addRecord("USP",JSON.stringify(list));
        //console.log("added");
        loading.dismiss();
        toast.present();
      })
      this.app.getRootNav().setRoot(TabsPage);
  }
}
