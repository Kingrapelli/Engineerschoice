import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isUserLoggedIn=false;
  userData:any ;
  darkMode:any = false;
  users=[{}];
  img1:any;
  img2:any;
  img3:any;
  img4:any;
  img5:any;
  img6:any;
  img7:any;
  chat = [  ];
  count:any =  0;
  parentId=1;
  widgetCardsData:any={
    count : this.count
  };
  notifications = [
  ];
  routedUser:any = '';
  from = new Date();
  constructor(private router:Router) { 
    this.img1='/assets/images/avatar-1.jpg';
    this.img2='/assets/images/avatar-2.jpg';
    this.img3='/assets/images/avatar-3.jpg';
    this.img4='/assets/images/avatar-4.jpg';
    this.img5='/assets/images/avatar-5.jpg';
    this.img6='/assets/images/avatar-6.jpg';
    this.img7='/assets/images/avatar-7.jpg';
    this.users=[
      {
        id : 1,
        "email":'Admin@gmail.com',
        "username":'Admin@gmail.com',
        "password": 'Admin@24262325',
        "loggedin": false,
        "active": false,
        "firstName": 'Admin',
        "lastName" : '',
        "gender" : 'Male',
        "dob" : '21/05/1997',
        "maritalStatus" : 'Single',
        "twitter":'',
        "skype" : '',
        "location" : 'Hyderbad, Telangana',
        "website" : "wwww.admin.com",
        "role": 'Admin',
        "designation": 'Admin',
        "image" : this.img1,
        "mobile" : 9985464746,
        'chat':[{}],
        'reviews':[
          
        ]
      },
      {
        id: 2,
        "email":'kingrapelli@gmail.com',
        "username":'kingrapelli@gmail.com',
        "password": 'naveen',
        "loggedin": false,
        "active": false,
        "firstName": 'Naveen Kumar',
        "lastName" : 'Rapelli',
        "gender" : 'Male',
        "dob" : '21/05/1997',
        "maritalStatus" : 'Single',
        "twitter":'Kingrapelli',
        "skype" : 'Kingrapelli@gmail.com',
        "location" : 'Bangalore, Karnataka',
        "website" : "wwww.kingrapelli.com",
        "role": 'User',
        "designation": 'Software Developer',
        "image" : this.img2,
        "mobile" : 9160148391,
        "chat" : [{}],
        'reviews':[
         
        ]
      },
      {
        id : 3,
        "email":'superadmin@gmail.com',
        "username":'superAdmin',
        "password": 'superAdmin@123',
        "loggedin": false,
        "active": false,
        "firstName": 'Super Admin',
        "lastName" : '',
        "gender" : 'FeMale',
        "dob" : '21/05/1997',
        "maritalStatus" : 'Married',
        "twitter":'',
        "skype" : '',
        "location" : 'Sircilla, Telangana',
        "website" : "wwww.superadmin.com",
        "role": 'Super Admin',
        "designation": 'IT person',
        "image" : this.img3,
        "mobile" : 9703773058,
        "chat" : [{}],
        'reviews':[
        ]
      }
    ]
    localStorage.setItem('users',JSON.stringify(this.users));
    localStorage.setItem('chat',JSON.stringify(this.chat));
    localStorage.setItem('notifications',JSON.stringify(this.notifications));
  }

  signIn(username:any,password:any){
    let _users = JSON.parse(localStorage.getItem('users'));
    let validated = null;
    for(let user of _users){
      if(username === user.email && password === user.password){
        this.isUserLoggedIn=true;
        user.active=true;
        user.loggedin=true;
        this.userData = user;
        validated = true;
        break;
      }
    }
    if(validated == true){
      localStorage.setItem('user',JSON.stringify(this.userData));
      this.router.navigate(['/dashboard']);
    }
    else{
      this.isUserLoggedIn=false;
      alert("invalid credentials");
    }
  }

  sendingMessageToAdmin(payload,id,sendTo,category){
    let _from = new Date();
    let tmpCategoryMsg = '';
    if(category == 'Query'){
      tmpCategoryMsg = "Query : " + payload.message;
    }
    else if(category == 'message'){
      tmpCategoryMsg = 'sent you message : '+ payload.message;
    }
    else if(category == 'Review'){
      tmpCategoryMsg = 'Given review : '+ payload.message;
    }
    let userData = JSON.parse(localStorage.getItem('user'));
    let tempNotification = {
      sendBy : id,
      message : tmpCategoryMsg,
      userName : userData.firstName,
      userImage : userData.image,
      sentTo : sendTo,
      category : category,
      sentAt : _from.toUTCString()
    }
    this.notifications.unshift(tempNotification);
    console.log(this.notifications);
    localStorage.setItem('notifications',JSON.stringify(this.notifications));
    this.getWidgetCardsData();
  }

  getWidgetCardsData(){
    let count = 0;
    this.notifications = JSON.parse(localStorage.getItem('notifications'));
    for(let notification of this.notifications){
      if(notification.category == 'Query'){
        count++;
      }
    }
    this.widgetCardsData = {
      count : count
    }
  }

  getRoutedUser(routedUser){
    this.routedUser=routedUser;
    console.log('before navigating')
    this.router.navigate(['/friend-profile']);
  }

  sendReview(payload){
    let userData = JSON.parse(localStorage.getItem('user'));
    let allUsers = JSON.parse(localStorage.getItem('users'));

    let tmpParentId=userData.reviews.length+this.parentId;
    // console.log(userData.reviews.length);
    let tmpReview = {
      sentTo : payload.sentTo,
      sentBy : payload.sentBy,
      senderFirstName: payload.senderFirstName,
      message: payload.message,
      rating : 3,
      senderImage : payload.senderImage,
      category : 'review',
      sendAt: payload.sendAt,
      parentId : tmpParentId,
      replies: []
    }
    for(let user of allUsers){
      if(payload.sentTo == user.id)
        user.reviews.push(tmpReview);
    }
    userData.reviews.push(tmpReview);
    localStorage.setItem('user',JSON.stringify(userData));
    localStorage.setItem('users',JSON.stringify(allUsers));
    if(payload.sentTo != userData.id){
      let category = 'Review';
      let tmpMessage={
        message:payload.message
      }
      this.sendingMessageToAdmin(tmpMessage,userData.id,payload.sentTo,category);
    }
  }

}
