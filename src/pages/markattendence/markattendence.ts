import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the MarkattendencePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-markattendence',
  templateUrl: 'markattendence.html',
})
export class MarkattendencePage {

  listTemp: any;
  date: any;
  result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servi: StorageProvider,  public loadingCtrl: LoadingController) {
    this.listTemp = this.navParams.get('list');
    this.date = this.navParams.get('date');
    //console.log(this.listTemp);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MarkattendencePage');
  }
  saveList(){
    let savingList = this.loadingCtrl.create({
    content: 'Please wait saving records DB...'
    });
    savingList.present();
    for(let i=0; i<this.listTemp.length; i++)
    {
      if(this.listTemp[i].toggler == true)
      {
        //console.log("toggler is ture--0");
        this.listTemp[i].toggler = false;
        let attended = this.listTemp[i].sAttended;
        attended++;
        let total = this.listTemp[i].sTotal;
        total++;
        let date = Date.now();
        this.listTemp[i].sAttended = attended;
        this.listTemp[i].sTotal = total;
        //console.log(attended);
        //console.log(total);
        this.listTemp[i].presentDates.push(date);
      }
      else
      {
        let total = this.listTemp[i].sTotal;
        total++;
        let date = Date.now();
        this.listTemp[i].sTotal = total;
        this.listTemp[i].absentDates.push(date);
      }
    }
    this.servi.addRecord("USP",JSON.stringify(this.listTemp)).then( ()=> {
      savingList.dismiss();
      this.navCtrl.pop();
    })
  }
}
