import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {
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
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.sendReviewForm=this.formBuilder.group({
      message:['']
    })
  }

  sendReview(){
    this.userData = JSON.parse(localStorage.getItem('user'));
    let _date = new Date();
    let tmpReview={
      sentTo : this.userData.id,
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
    let tmpReviews:any;
    tmpReviews= this.userData.reviews;
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
    let tmpReviews:any;
    tmpReviews= this.userData.reviews;
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
}
