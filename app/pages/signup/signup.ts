import { Component } from '@angular/core';
import { Page } from 'ionic-angular';
import { NgIf } from '@angular/common'
import { DataService } from '../../data/data.service';
import { UserService } from '../../user/user.service';
import {NavController , NavParams} from 'ionic-angular';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [DataService, UserService],
  directives: [NgIf]
})
export class SignupPage {
  constructor(private nav: NavController) {}
}
