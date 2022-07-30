import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-friendprofile',
  templateUrl: './friendprofile.component.html',
  styleUrls: ['./friendprofile.component.scss']
})
export class FriendprofileComponent implements OnInit {

  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public basicContent: string;

  routedUser:any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;
  userData:any;
  allUsers:any;
  sendReviewForm:any;
  constructor(private service:AuthService,private formBuilder:FormBuilder) {
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.routedUser = this.service.routedUser;
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.sendReviewForm=this.formBuilder.group({
      message:['']
    })
  }

  sendReview(){
    this.userData = JSON.parse(localStorage.getItem('user'));
    let _date = new Date();
    let tmpReview={
      sentTo : this.routedUser.id,
      sentBy : this.userData.id,
      senderFirstName: this.userData.firstName,
      message:this.sendReviewForm.value.message,
      rating : 3,
      senderImage : this.userData.image,
      category : 'review',
      sendAt: _date.toUTCString()
    }
    this.service.sendReview(tmpReview);
    this.sendReviewForm.controls['message'].setValue('');
  }

  public get allReplies(){
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    let tmpReviews:any;
    tmpReviews= this.routedUser.reviews;
    let tmpReplies=[];
    for(let review of tmpReviews){
      for(let i=0;i<review.replies.length;i++){
        tmpReplies.push(review.replies[i]);
      }
    }
    return tmpReplies;
  }

  public get allReviews(){
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    let tmpReviews:any;
    for(let user of this.allUsers){
      if(this.routedUser.id == user.id){
        tmpReviews= user.reviews;
      }
    }
    return tmpReviews;
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }
  ngOnDestroy(){
    this.routedUser='';
  }

}
