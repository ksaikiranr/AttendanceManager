import { Component, ViewChild } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
/**
 * Generated class for the StudentdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-studentdetails',
  templateUrl: 'studentdetails.html',
})
export class StudentdetailsPage {

   @ViewChild('doughnutCanvas') doughnutCanvas;
   doughnutChart: any;

   student: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = this.navParams.get('item');
    //console.log(this.student);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad StudentdetailsPage');
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

           type: 'doughnut',
           data: {
               labels: ["Absent", "Present"],
               datasets: [{
                   label: '# attendence details',
                   data: [this.student.sTotal-this.student.sAttended, this.student.sAttended],
                   backgroundColor: [
                       '#F06292','#4DB6AC',

                   ],
                   hoverBackgroundColor: [
                       "#FF6384",
                       "#00BFA5",
                   ]
               }]
           }

       });
   }

}
