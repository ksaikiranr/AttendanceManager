import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import {App} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { MarkattendencePage} from '../markattendence/markattendence';
import { StudentdetailsPage } from '../studentdetails/studentdetails';

import { StartedStudentsPage } from '../started-students/started-students';
import {LoginPage} from '../login/login';
import { SearchPipe } from '../../pipes/search/search';

import { StorageProvider } from '../../providers/storage/storage'

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  list: any;
  nowDate: any;
  studentSearchId: string;
  listTemp: any;
  term: string ='';

  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams, public servi: StorageProvider, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController, public alertCtrl: AlertController) {
                this.list = [];
    this.nowDate = new Date().toISOString();
    //console.log(this.nowDate);
    this.studentSearchId = '';
    this.loadList();
    //console.log("my list",this.list);
  }

  searchFn(ev: any) {
    this.term = ev.target.value;
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
      this.list=data;
      //console.log('got data'+this.list);
      this.listTemp = this.list;
      loading.dismiss();
      toast.present();
    });
    //console.log('ionViewDidEnter ListPage');
  }

  ionViewDidEnter(){
    this.servi.getList().then( data => {
      this.list=data;
      //console.log('got data'+this.list);
      this.listTemp = this.list;
    });
  }
  takeAttendence(event, list, nowDate){
      this.navCtrl.push(MarkattendencePage,
      {
        list: list,
        date: nowDate
      })
  }

  showDetails($event, item){
    this.navCtrl.push(StudentdetailsPage, {
      item: item
    })
  }

  color(item, index){
    item.sStar=!item.sStar;
    //console.log("starred with value ",item.sStar);
    this.list[index] = item;
  }
  ionViewWillLeave(){
    //console.log("leave view write");
    this.servi.write(JSON.stringify(this.list));
  }

  removeStudent(item){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Removing student from Database. Please wait...'
    });
    let confirm = this.alertCtrl.create({
      title: 'Remove student?',
      message: 'This student and all associated data will be permanently removed.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            //console.log('Agree clicked');
            loading.present();
            let list: any;
            let i;
            this.servi.getList().then( data => {
              list = data;
              for(i=0;i<list.length;i++){
                if(list[i].sUsn==item.sUsn)
                  break;
              }
              list.splice(i,1);
              this.servi.addRecord("USP",JSON.stringify(list));
              //console.log("removed");
            })
            this.servi.remove(item).then(
              () =>{
                this.servi.getList().then( data => this.list = data);
                loading.dismiss();
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

  doRefresh(refresher) {
    //console.log("refresh write");
    this.loadList();
    if(this.list!=null){
      //console.log("    preforming write");
     this.servi.write(JSON.stringify(this.list)).then(
       () => {
         this.loadList();
         refresher.complete();
       }
     )
   }
   else
    refresher.complete();
 }
 refresh(fab){
   this.loadList();
   fab.close()
 }
 logout(fab){
   let confirm = this.alertCtrl.create({
     title: 'Logout',
     message: 'Do you want to logout from the app?',
     buttons: [
       {
         text: 'No',
         handler: () => {
           //console.log('Disagree clicked');
           fab.close();
         }
       },
       {
         text: 'Yes',
         handler: () => {
           //console.log('Agree clicked');
           fab.close();
           this.app.getRootNav().setRoot(LoginPage);
         }
       }
     ]
   });
   confirm.present();
 }
 goToStarPage(fab){
   fab.close();
   this.navCtrl.push(StartedStudentsPage);
 }
}
