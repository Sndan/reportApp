import { Component } from '@angular/core';
import { Page,Popover } from 'ionic-angular';
import { NgIf } from '@angular/common'
import { DataService } from '../../data/data.service';
import { UserService } from '../../user/user.service';
import { LoginComponent } from './components/login.component';
import { LogoutComponent } from './components/logout.component';
import {NavController , NavParams} from 'ionic-angular';
import {ScientificFactsPage} from '../scientific-facts-page/scientific-facts-page';
import {Page3} from '../Page3/Page3';

@Component({
  templateUrl: 'build/pages/getting-started/getting-started.html',
  providers: [DataService, UserService],
  directives: [LoginComponent, LogoutComponent, NgIf]
})
export class GettingStartedPage {
    public private: string;
    public isAuth: boolean;
    public userinfo : any;
    public currentUser : any;

    constructor(private _navController: NavController,private _data: DataService, private _user: UserService,navParams: NavParams) {
      this.currentUser = this._user.auth.currentUser;
    }
    onPageDidEnter() {
      this._user.auth.onAuthStateChanged(user => [this.userinfo = user,this.isAuth = !!user]);
      console.log(this.currentUser);
      console.log(this.isAuth);
      if(!this.currentUser.isAnonymous){
        console.log("auth: " + this.currentUser.email);
      }
      console.log(this.currentUser.email);
      console.log(this.isAuth);
      this._data.db.child('private').on('value', data => {
          this.private = data.val();
      });
    }
  goToFactsPage(){
    this._navController.push(Page3);
  }
}
