import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import { ApiProvider } from '../../providers/api/api';
import { SuccessPage } from '../success/success';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  token:any;

  public settings = {"name":"","propic":"","quotes":"","viewPreference":"","type":"","username":"","password":"","visibility":""};

  constructor(private api: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.token = navParams.get('token');
    this.api.setToken(this.token);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  swipeRightEvent(event){
    this.navCtrl.pop();
  }

  updateSettings(){
    console.log("submitted");
    console.log(this.settings);
    let postBody = {"name":"","profilePicUrl":"","quotes":"","viewPreference":"","type":"","socialMediaID":"","socialMediaPassword":"","visibility":""};

    postBody.name = this.settings.name;
    postBody.profilePicUrl = this.settings.propic;
    postBody.quotes = this.settings.quotes;
    postBody.viewPreference = "1";

    postBody.type = this.settings.type;
    postBody.socialMediaID = this.settings.username;
    postBody.socialMediaPassword = this.settings.password;
    if(this.settings.visibility){
      postBody.visibility = "1";
    }else{
      postBody.visibility = "0";
    }



    console.log(postBody);

    let response = this.api.apiPost('user', postBody)
      .then(data => {
        console.log(data);
        let str = data.toString();
       if(str==='update successful'){
         //
        console.log(str);

       }

      });



  }

}
