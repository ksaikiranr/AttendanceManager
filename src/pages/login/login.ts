import { Component } from '@angular/core';
import {NavController, NavParams, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  emailid: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.emailid = '';
    this.password = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Login(){
    if(this.emailid =='' || this.password == ''){
      let confirm = this.alertCtrl.create({
        title: 'Login error',
        message: 'Email id and/or password is empty! Please try again ...',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              //console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
      return;
    }
    if(this.password != 'login123'){
      let confirm = this.alertCtrl.create({
        title: 'Login error',
        message: 'Invalid password. Try login123 as your password ...',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              //console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
      return;
    }
    let confirm = this.alertCtrl.create({
      title: 'Login success',
      message: 'Welcome. Please read app documentaion in About section if this is your first time, have fun :) ...',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
    this.navCtrl.push(TabsPage);
  }
}
