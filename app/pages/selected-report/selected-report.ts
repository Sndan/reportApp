import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

/*
  Generated class for the SelectedReportPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/selected-report/selected-report.html',
})
export class SelectedReportPage{
  public report:any;
  
  constructor(private _navController: NavController, private _navParams: NavParams) {
    //this.report = this._navParams.data.selectedReport;
  }

  ionViewWillEnter(){
    var data = this._navParams.data.selectedReport;
    this.report = Object.keys(data).map((key)=>{ return data[key]});
    console.log(Object.keys(this.report).map((key)=>{ return this.report[key]}));
  }

  goBack(){
    this._navController.pop();
  }
}
