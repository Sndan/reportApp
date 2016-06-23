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
    this.report = this._navParams.data.selectedReport;
  }

  ionViewWillEnter(){
    this.report = this._navParams.data.selectedReport;

  }

  goBack(){
    this._navController.pop();
  }
}
