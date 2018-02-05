import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {
  list: any;
  sortList: any;
  oldList: any;

  constructor(public storage: Storage) {
    this.list = [];
    //console.log('Hello StorageProvider Provider');
  }



  addRecord(sub: string,record: any){
    //console.log("Recevied details of student is ");
    //console.log(record);
    return this.storage.set(sub,record);
  }

  write(list){
    //console.log("lwriting" + list);
    return this.storage.set("USP",list).then(
      ()=>{
        this.getList().then(
          (data) => {
            //console.log(data);
          }
        )
      }
    );
  }

  remove(item){
    return this.storage.remove(item.sUsn);
  }

  getList(){
    this.list = [];
    return this.storage.get("USP").then( data=> this.list = JSON.parse(data));
  }

  populateDatabse(){
    this.list = this.createList();
    //console.log("Returned list is: ",this.list);
    return this.write(JSON.stringify(this.list));
  }

  createList(){
    this.list = [];
    let student = {
      sName: "",
      sUsn: "",
      sSubject: "USP",
      sRoll: 65,
      sAttended: 4,
      sTotal: 6,
      sStar: false,
      toggler: false,
      presentDates: ["2017-06-10T14:42:41.615Z", "2017-06-11T14:42:41.615Z", "2017-06-12T14:42:41.615Z", "2017-06-13T14:42:41.615Z"],
      absentDates: [ "2017-06-09T14:42:41.615Z", "2017-06-08T14:42:41.615Z"]
    }
    let name: string;
    let sStar: boolean;
    for(var i=1;i<=65;i++)
    {
      if( i%7 === 0)
      name = "Indhu";
      else if ( i%6 === 0)
        name = "Mahesh";
      else if( i%5 === 0 )
        name = "Priya";
      else if( i%4 === 0 )
        name = "Suresh";
      else if( i%3 === 0 )
        name = "Usha";
      else if( i%2 === 0 )
        name = "Mohan";
      else if( i%1 === 0 )
        name = "Prashant";
      if( i%3 === 0 )
        sStar = true;
      else
        sStar = false;
      var std = Object.assign({}, student, {
        sName: name,
        sStar: sStar,
        sRoll: i,
      });
      std.sUsn = "3VC14CS0" + std.sRoll;
      this.list.push(std);
    }
    return this.list;
  }

  clearDatabase(){
    //console.log("Called clear db");
    return this.storage.clear().then(
      ()=>{
        this.getList().then(
          (data) => {
            //console.log(data);
          }
        )
      }
    );
  }
}
