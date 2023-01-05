import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  sendReplyForm:any;
  userProfileForm:any;
  openReplyChat:any= false;
  formData = new FormData();
  user:any;
  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
  
  constructor(private service:AuthService,private formBuilder:FormBuilder,
    private cdRef:ChangeDetectorRef) {
    
  }

  ngOnInit() {
    this.getUser();
    // this.user = JSON.parse(localStorage.getItem('user'));
    // this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.userProfileForm = this.formBuilder.group({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      gender:new FormControl(''),
      dob:new FormControl(''),
      maritalStatus:new FormControl(''),
      location:new FormControl(''),
      mobile:new FormControl(''),
      email:new FormControl(''),
      twitter:new FormControl(''),
      skype:new FormControl(''),
      website:new FormControl(''),
      image:new FormControl('')
    });
    this.sendReviewForm=this.formBuilder.group({
      message:['']
    });
    this.sendReplyForm=this.formBuilder.group({
      replyMessage:['']
    });
    // setInterval(()=>{
    //   this.getUser();
    // },2000);
  }

  async getUser(){
    const localUser = JSON.parse(localStorage.getItem('user'));
    this.service.getUserById(this.service.user ? this.service.user.id : localUser.id).subscribe(res=>{
      this.user = res;
    });
  }

  readUrl(e:any){
    this.formData.append('image',e.target.files[0]);
    this.formData.append('id', this.user._id);
    this.uploadImage();
  }

  uploadImage() {
    console.log(this.formData.get('image'));
    console.log(this.formData.get('id'));
    this.service.uploadProfileById(this.formData).subscribe(
      (res) => {
        console.log(res);
        this.fileInputRef.nativeElement.value = "";
        this.userProfileForm.controls['image'].reset();
        this.formData.delete('image');
        this.formData.delete('id');
        this.getUser();
      }, (err) => {
        console.log(err);
      }
    );
  }

  settingOpenReplyChat(){
    this.openReplyChat=this.openReplyChat == true ? false : true;
  }

  sendReview(){
    // this.user = JSON.parse(localStorage.getItem('user'));
    let _date = new Date();
    let tmpReview={
      sentTo : this.user._id,
      sentBy : this.user._id,
      senderFirstName: this.user.firstName,
      message:this.sendReviewForm.value.message,
      rating : 3,
      senderImage : this.user.image,
      category : 'review',
      sendAt: _date.toUTCString()
    }
    this.service.sendReview(tmpReview).subscribe(res=>{
      this.getUser();
      this.sendReviewForm.reset();
      this.sendReviewForm.controls['message'].setValue('');
    });
    // this.cdRef.detectChanges();
  }

  sendReply(parentId){
    // this.user = this.userDetails;
    let _date = new Date();
    let tmpReply={
      sentTo : this.user.id,
      sentBy : this.user.id,
      senderFirstName: this.user.firstName,
      message:this.sendReplyForm.value.replyMessage,
      rating : 3,
      senderImage : this.user.image,
      category : 'reply',
      sendAt: _date.toUTCString()
    }
    this.service.sendingReplyToReview(tmpReply,parentId);
    this.sendReplyForm.controls['replyMessage'].setValue('');
    this.openReplyChat = false;
    this.getUser();
    // this.cdRef.detectChanges();
  }

  public get allReplies(){
    // this.user = JSON.parse(localStorage.getItem('user'));
    let tmpReviews:any;
    tmpReviews= this.user.reviews;
    let tmpReplies=[];
    for(let review of tmpReviews){
      for(let i=0;i<review.replies.length;i++){
        tmpReplies.push(review.replies[i]);
      }
    }
    return tmpReplies;
  }

  public get allReviews(){
    let tmpReviews = this.user.reviews
    return tmpReviews;
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
    this.userProfileForm.controls['firstName'].setValue(this.user.firstName);
    this.userProfileForm.controls['lastName'].setValue(this.user.lastName);
    this.userProfileForm.controls['gender'].setValue(this.user.gender);
    this.userProfileForm.controls['dob'].setValue(this.user.dob);
    this.userProfileForm.controls['maritalStatus'].setValue(this.user.maritalStatus);
    this.userProfileForm.controls['location'].setValue(this.user.location);
    this.userProfileForm.controls['mobile'].setValue(this.user.mobile);
    this.userProfileForm.controls['twitter'].setValue(this.user.twitter);
    this.userProfileForm.controls['skype'].setValue(this.user.skype);
    this.userProfileForm.controls['website'].setValue(this.user.website);
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  onSubmitSaveProfile(_id){
    console.log(this.userProfileForm.value);
    this.service.updateProfile(_id, this.userProfileForm.value).subscribe(res=>{
      console.log(res)
      if(res['status'] == true){
        alert("Data saved successfully..");
      }
    });
  }
}
