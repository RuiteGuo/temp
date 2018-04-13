import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import { NavController,NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import {SettingsPage} from "../settings/settings";
import {SearchPage} from "../search/search";
import { UserProfilePage } from '../user-profile/user-profile';
import { ErrorFeedPage } from '../error-feed/error-feed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	posts: any;
  noPhoto: 'style="display: none;"';
  itemExpandHeight: number = 200;
  expanded: boolean = false;
  twitterFeedEndpoint: '';
  token : any;

  appName:any;
  quotes:any;
  picsURL:any;
  uID:any;

  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider, public http: Http) {
    this.token = navParams.get('token');
    this.api.setToken(this.token);

        this.getFeed();


    //this.api.setToken(navParams.get('token'));


    this.appName = navParams.get('appName');
    this.quotes = navParams.get('quotes');
    this.picsURL = navParams.get('picsURL');
    this.uID = navParams.get('uID');

    console.log(this.appName);
    console.log(this.quotes);


  	}

    getFeed(){
      let response = this.api.apiGet('social/twitter/feed')
      .then(data => {
        let dataError = data.toString();
        var strChars = dataError.split("");
        console.log(dataError + " before Checking");
        if (strChars[0]==="E" && strChars[1]==="R" && strChars[2]==="R" && strChars[3]==="O" && strChars[4]==="R" ) {

         this.goToErrorFeedPage();
         //  let errorMSG = document.getElementById('errorMessage');
         //  let displaySetting = errorMSG.style.display;
         //  console.log(displaySetting);
         //  console.log('show Error Message');
         //  if (displaySetting =='none') {
         //    console.log('show Error Message');
         //    errorMSG.style.display = 'block';
         //  }



          this.http.get('../assets/timeline_with_photo.json').map(res => res.json()).subscribe(data => {

              this.posts = data;
              console.log("worked");
              for(let i = 0; i<= this.posts.length - 1; i++){
                this.posts[i].platformPic = '/assets/imgs/twitter.png';
                //    this.posts[i].date = this.calculateSince(this.posts[i].created_at);
                this.posts[i].user.screen_name = '@' + this.posts[i].user.screen_name;
                if (typeof this.posts[i].entities.media !== 'undefined'){
                  this.posts[i].hasPhoto = true;
                  this.posts[i].photo = this.posts[i].entities.media[0].media_url;
                }
                else{
                  this.posts[i].hasPhoto = false;
                  this.posts[i].photo = null;
                }

              }
            },
            err => {
              console.log("Oops!");
            }
          );
        }  else {
          let errorMSG = document.getElementById('errorMessage');
          let displaySetting = errorMSG.style.display;
          if (displaySetting =='block') {
            errorMSG.style.display = 'none';
          }

          console.log(data);
          this.posts = data;
           this.processFeed();
        }

      });

    }

    processFeed(){
      for(let i = 0; i<= this.posts.length - 1; i++){
        this.posts[i].platformPic = '/assets/imgs/twitter.png';
    //  this.posts[i].date = this.calculateSince(this.posts[i].created_at);
        this.posts[i].user.screen_name = '@' + this.posts[i].user.screen_name;
        if (typeof this.posts[i].entities.media !== 'undefined'){
         this.posts[i].hasPhoto = true;
         this.posts[i].photo = this.posts[i].entities.media[0].media_url;
       }
      else{
         this.posts[i].hasPhoto = false;
         this.posts[i].photo = null;
        }

      }
    }

  swipeLeftEvent(event) {
     this.navCtrl.push(PostPage,{token:this.api.getToken()});
   }

  swipeRightEvent(event){
    this.navCtrl.pop();
  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage,{token:this.api.getToken()});
  }

  goToSearchPage() {
    this.navCtrl.push(SearchPage,{token:this.api.getToken()});
  }

  goToErrorFeedPage() {
    this.navCtrl.push(ErrorFeedPage,{token:this.api.getToken(),appName:this.appName,quotes:this.quotes,picsURL:this.picsURL,uID:this.uID } );
  }

  goToProfilePage() {
    this.navCtrl.push(UserProfilePage,{token:this.api.getToken(),appName:this.appName,quotes:this.quotes,picsURL:this.picsURL,uID:this.uID } );
  }


   goToPostPage() {
     this.navCtrl.push(PostPage,{token:this.api.getToken()});
   }


  getItems(event){
    console.log("Something entered in search bar")
  }

  expandAll(){

    this.expanded = !this.expanded;

    for(let i = 0; i<= this.posts.length - 1; i++){
      this.posts[i].expand = this.expanded;
    }
  }

  expandItem(post){
    console.log("Yep");
    console.log(post.expand);
    console.log(post.content);
    post.expand = !post.expand;
    console.log(post.expand);

  }

  likePost(post) {
    console.log("I like this post");
    console.log(post);

  }

  commentPost(post) {
    console.log("I comment on this post.");
    console.log(post);

  }


}
