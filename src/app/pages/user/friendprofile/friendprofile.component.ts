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
  user:any;
  openReplyChat:any= false;

  constructor(private service:AuthService,private formBuilder:FormBuilder) {
  }

  ngOnInit() {
    this.getUser();
    this.getAllUserss();
    // this.userData = JSON.parse(localStorage.getItem('user'));
    this.routedUser = this.service.routedUser;
    // this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.sendReviewForm=this.formBuilder.group({
      message:['']
    });
    setInterval(()=>{
      this.getUser();
      this.getAllUserss();
    },2000);
  }

  settingOpenReplyChat(){
    this.openReplyChat=this.openReplyChat == true ? false : true;
  }

  async getUser(){
    const localUser = JSON.parse(localStorage.getItem('user'));
    this.service.getUserById(this.service.user ? this.service.user.id : localUser.id).subscribe(res=>{
      this.user = res;
    });
  }

  sendReview(){
    // this.userData = JSON.parse(localStorage.getItem('user'));
    let _date = new Date();
    let tmpReview={
      sentTo : this.routedUser._id,
      sentBy : this.user._id,
      senderFirstName: this.user.firstName,
      message:this.sendReviewForm.value.message,
      rating : 3,
      senderImage : this.user.image,
      category : 'review',
      sendAt: _date.toUTCString()
    }
    this.service.sendReview(tmpReview).subscribe(res=>{});
    this.sendReviewForm.controls['message'].setValue('');
  }

  public get allReplies(){
    // this.userData = JSON.parse(localStorage.getItem('user'));
    // this.allUsers = JSON.parse(localStorage.getItem('users'));
    let tmpReviews:any;
    tmpReviews= this.routedUser.reviews;
    // console.log("tmpReviews",tmpReviews);
    let tmpReplies=[];
    for(let review of tmpReviews){
      for(let i=0;i<review.replies.length;i++){
        tmpReplies.push(review.replies[i]);
      }
    }
    return tmpReplies;
  }

  getAllUserss(){
    this.service.getAllUsers().subscribe(res=>{
      this.allUsers = res;
    },err=>{
      console.log('error',err)
    });
  }

  public get allReviews(){
    // this.userData = JSON.parse(localStorage.getItem('user'));
    // this.allUsers = JSON.parse(localStorage.getItem('users'));
    let tmpReviews:any;
    for(let _user of this.allUsers){
      if(this.routedUser._id == _user._id){
        tmpReviews= _user.reviews;
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
