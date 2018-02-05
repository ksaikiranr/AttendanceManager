import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SearchPipe } from '../../pipes/search/search';
import { StudentdetailsPage } from '../studentdetails/studentdetails';

import { StorageProvider } from '../../providers/storage/storage'

/**
 * Generated class for the StartedStudentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-started',
  templateUrl: 'started-students.html',
})
export class StartedStudentsPage {

  list1: any;
  term: any;
  list: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public servi: StorageProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
                this.loadList();
                this.list = [];
  }
  searchFn(ev: any) {
    this.term = ev.target.value;
  }

  showDetails($event, item){
    this.navCtrl.push(StudentdetailsPage, {
      item: item
    })
  }

  loadList() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading records from Database. Please wait...'
    });
    let toast = this.toastCtrl.create(
      {
          message: 'List refresh success',
          duration: 3000,
          position: 'bottom'
    });
    loading.present();
    this.servi.getList().then( data => {
      this.list1=data;
      if( data ==  null){
        loading.dismiss();
        toast.present();
        return;
      }
      //console.log(data);
      for(var i=0;i<this.list1.length;i++){
        if(this.list1[i].sStar)
          this.list.push(this.list1[i]);
      }
      loading.dismiss();
      toast.present();
    });
    //console.log('ionViewDidEnter ListPage');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad StartedStudentsPage');
  }

}
