import { Component } from '@angular/core';
import { Page } from 'ionic-angular';
import { NgIf } from '@angular/common'
import { DataService } from '../../data/data.service';
import { UserService } from '../../user/user.service';
import { LoginComponent } from './components/login.component';
import { LogoutComponent } from './components/logout.component';
import {NavController , NavParams} from 'ionic-angular';
import {SelectedReportPage} from '../selected-report/selected-report';
import {NewReportPage} from '../new-report/new-report';
/*
  Generated class for the ReportsViewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/reports-view/reports-view.html',
  providers: [DataService, UserService],
  directives: [LoginComponent, LogoutComponent, NgIf]
})
export class ReportsViewPage {
    public private: string;
    public isAuth: boolean;
    public userinfo : any;
    public currentUser : any;
    public reports: any;

    constructor(private _navController: NavController,private _data: DataService, private _user: UserService,navParams: NavParams) {
      this.currentUser = this._user.auth.currentUser;
      
      //Promise.all([this.loadUserReports(),this.loadUserInfo()]);
    }
    
    onPageDidEnter() {
      this._user.auth.onAuthStateChanged(user => [this.userinfo = user,this.isAuth = !!user]);
      var user = this._user.auth.currentUser;
      if(!this.currentUser.isAnonymous){
        console.log("auth: " + this.currentUser.email);
      }
      console.log(user.email);
      console.log(this.isAuth);
      this._data.db.child('private').on('value', data => {
          this.private = data.val();
      });
      Promise.all([this.loadUserReports(),this.loadUserInfo()]);
``  }
    public loadUserReports(){
        return new Promise(res => {
            // this method...
            this._data.db.child('report-tasks/'+ this._user.auth.currentUser.uid).on('value', data => {
                this.reports = Object.keys(data.val()).map((key)=>{ return data.val()[key]});//data.val();
                Object.keys(data.val()).map((key)=>{ return data.val()[key]});
                //this.reports.$id =data.key();
                console.log(this.reports);
                res();
            });
        });
    }
    public loadUserInfo(){
        return new Promise(res => {
            // this method...
            this._user.auth.onAuthStateChanged(user => [this.userinfo = user,this.isAuth = !!user]);
        });
    }
    selectReport(report){
         //this._navController.push(SelectedReportPage,{selectedReport: report});
           this._navController.push(SelectedReportPage, {selectedReport: report})
    }
    newReport(){
         //this._navController.push(SelectedReportPage,{selectedReport: report});
        this._navController.push(NewReportPage)
    }
    writeNewTask() {
    // A post entry.uid, username, task, start_time, end_time, events
        var rightNow = new Date();
        var dateTime = rightNow.toISOString().slice(0,10).replace(/-/g,"");
        var taskData = {
            author: this._user.auth.currentUser.email,
            uid:  this._user.auth.currentUser.uid,
            task: "task",
            start_time: "start_time",
            events: "installing a pipe into the fucking machine",
            geo_location:""
        };

        // Get a key for a new Post.
        var newTasktKey = this._data.db.child('Tasks').push().key;
        //var dateTime = "";
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        //updates['/tasks/' + dateTime + newTasktKey] = taskData;
        updates['/report-tasks/' + this._user.auth.currentUser.uid + '/' + dateTime +'/'+ newTasktKey] = taskData;

    return this._data.db.update(updates);
  }
}
