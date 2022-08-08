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
  revenue:any;
  tmpRevenue:any=0;
  allBookings:any =[];
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
    let naveen='/assets/images/naveen.jpeg';
    let raj='/assets/images/raj.jpeg';
    let srikanth='./assets/images/srikanth.jpeg';
    let sai='./assets/images/sai.jpeg';
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
        "image" : srikanth,
        "mobile" : 9985464746,
        'chat':[{}],
        'reviews':[],
        "userBookings":[],
        "notifications":{
          "blogs":true,
          "chats":true,
        }
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
        "image" : naveen,
        "mobile" : 9160148391,
        "chat" : [{}],
        'reviews':[],
        "userBookings":[],
        "notifications":{
          "blogs":false,
          "chats":true,
        }
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
        "image" : this.img7,
        "mobile" : 9703773058,
        "chat" : [{}],
        'reviews':[],
        "userBookings":[],
        "notifications":{
          "blogs":true,
          "chats":true,
        }
      },
      {
        id : 4,
        "email":'rajkumar@gmail.com',
        "username":'rajkumar',
        "password": 'rajkumar@12',
        "loggedin": false,
        "active": false,
        "firstName": 'Raj Kumar',
        "lastName" : 'Dusa',
        "gender" : 'Male',
        "dob" : '09/09/1997',
        "maritalStatus" : 'Single',
        "twitter":'rajKumar12345',
        "skype" : 'rajkumar@gmail.com',
        "location" : 'Karimnagar, Telangana',
        "website" : "wwww.dusaraj.com",
        "role": 'User',
        "designation": 'Civil Engineer',
        "image" : raj,
        "mobile" : 8500034567,
        "chat" : [{}],
        'reviews':[],
        "userBookings":[],
        "notifications":{
          "blogs":true,
          "chats":true,
        }
      },
      {
        id : 5,
        "email":'sai@gmail.com',
        "username":'saikumar',
        "password": 'lagishetti@12',
        "loggedin": false,
        "active": false,
        "firstName": 'Sai Kumar',
        "lastName" : 'Lagishetti',
        "gender" : 'Male',
        "dob" : '29/04/1997',
        "maritalStatus" : 'Single',
        "twitter":'sailagishetti45',
        "skype" : 'saikumar@gmail.com',
        "location" : 'Sircilla, Telangana',
        "website" : "wwww.lagishetti.com",
        "role": 'User',
        "designation": 'Assistant Manager',
        "image" : sai,
        "mobile" : 9533409061,
        "chat" : [{}],
        'reviews':[],
        "userBookings":[],
        "notifications":{
          "blogs":true,
          "chats":true,
        }
      }
    ]
    localStorage.setItem('users',JSON.stringify(this.users));
    localStorage.setItem('chat',JSON.stringify(this.chat));
    localStorage.setItem('notifications',JSON.stringify(this.notifications));
    localStorage.setItem('allBookings',JSON.stringify(this.allBookings));
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
    else if(category == 'hotel'){
      tmpCategoryMsg = 'Booked '+ category + ' :'+ payload.message;
    }
    else if(category == "blog"){
      tmpCategoryMsg = payload.message;
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
    this.getWidgetCardsData(0);
  }

  getWidgetCardsData(revenue){
    let count = 0;
    this.tmpRevenue = this.tmpRevenue + revenue;
    this.notifications = JSON.parse(localStorage.getItem('notifications'));
    for(let notification of this.notifications){
      if(notification.category == 'Query'){
        count++;
      }
    }
    this.widgetCardsData = {
      count : count,
      revenue : this.tmpRevenue
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
    console.log(userData);
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

  public get userDetails(){
    return JSON.parse(localStorage.getItem('user'));
  }

  public get allUserDetails(){
    return JSON.parse(localStorage.getItem('users'));
  }

  sendingReplyToReview(payload,parentId){
    console.log(this.allUserDetails);
    let tmpReview = {
      sentTo : payload.sentTo,
      sentBy : payload.sentBy,
      senderFirstName: payload.senderFirstName,
      message: payload.message,
      rating : 3,
      senderImage : payload.senderImage,
      category : payload.category,
      sendAt: payload.sendAt,
      parentId : parentId
    }
    // console.log(tmpReview);
    for(let user of this.allUserDetails){
      if(user.id == tmpReview.sentBy){
        // console.log(user.reviews)
        
      }
    }
  }

  saveIntoBookings(payload,revenue,hotelData){
    let _from = new Date();
    this.allBookings= JSON.parse(localStorage.getItem('allBookings'));
    let userData = JSON.parse(localStorage.getItem('user'));
    let allUsers = JSON.parse(localStorage.getItem('users'));
    console.log(payload,revenue);
    let tmpBookings={
      userId : userData.id,
      userName : userData.firstName,
      userImage : userData.image,
      typeOfRoom : payload.typeOfRoom,
      noOfRooms : payload.noOfRooms,
      fromDate : payload.fromDate,
      toDate : payload.toDate,
      const : payload.cost,
      bookedAt : _from.toUTCString()
    }
    this.allBookings.push(tmpBookings);
    this.getWidgetCardsData(revenue);
    let tmpPayload = { message: hotelData.name };
    this.sendingMessageToAdmin(tmpPayload,userData.id,3,payload.category);
  }

}
