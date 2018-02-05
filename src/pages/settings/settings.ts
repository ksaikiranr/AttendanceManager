import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AlertController, ToastController } from 'ionic-angular';
import { StorageProvider} from '../../providers/storage/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, public servi: StorageProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SettingsPage');
  }

  showDeleteConfirm() {
    let toast = this.toastCtrl.create(
      {
          message: 'All records were successfully deleted from Database',
          duration: 3000,
          position: 'bottom'
    });
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Deleting records from Database. Please wait...'
    });

    let confirm = this.alertCtrl.create({
      title: 'Delete Database?',
      message: 'Do you want to erase all records?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            //console.log('Agree clicked');
            loading.present();
            this.servi.clearDatabase().then( ()=>{
              loading.dismiss();
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  populateDatabse() {
    let toast = this.toastCtrl.create(
      {
          message: 'Dummy records were successfully added to Database',
          duration: 2000,
          position: 'bottom'
    });
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Generating dummy records and storing in Database. Please wait...'
    });

    let confirm = this.alertCtrl.create({
      title: 'Populate Database?',
      message: 'Do you want to add dummy records to database?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            //console.log('Agree clicked');
            loading.present();
            this.servi.populateDatabse().then( ()=>{
              loading.dismiss();
              toast.present();
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
