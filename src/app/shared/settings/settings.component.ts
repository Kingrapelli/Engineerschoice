import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  blogs:boolean;
  chats:boolean;
  reviews:boolean;
  busses:boolean;
  trains:boolean;
  flights:boolean;
  hotels:boolean;
  restaurants:boolean;
  jobs:boolean;
  results:boolean;
  allNotification:boolean=false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
   if((this.userData.notifications.blogs == true) && (this.userData.notifications.blogs == true)){
    this.allNotification=true;
   }
  }

  eventCheckforNotifications(event){
    this.userData.notifications.blogs=true;
    this.userData.notifications.chats=true;
  }

  public get userData(){
    return JSON.parse(localStorage.getItem('user'));
  }

  public get allUsers(){
    return JSON.parse(localStorage.getItem('users'));
  }

  eventCheckforBlogs(event){
    this.blogs=event.target.checked;
    this.userData.notifications.blogs=this.blogs;
  }

  eventCheckforChats(event){
    this.chats=event.target.checked;
    this.userData.notifications.chats=this.chats;
  }

  eventCheckforReviews(event){
    this.reviews=event.target.checked;
    this.userData.notifications.reviews=this.reviews;
  }

  eventCheckforBusses(event){
    this.busses=event.target.checked;
    this.userData.notifications.busses=this.busses;
  }

  eventCheckforTrains(event){
    this.trains=event.target.checked;
    this.userData.notifications.trains=this.trains;
  }

  eventCheckforFlights(event){
    this.flights=event.target.checked;
    this.userData.notifications.flights=this.flights;
  }

  eventCheckforHotels(event){
    this.hotels=event.target.checked;
    this.userData.notifications.hotels=this.hotels;
  }

  eventCheckforRestaurants(event){
    this.restaurants=event.target.checked;
    this.userData.notifications.restaurants=this.restaurants;
  }

  eventCheckforJobs(event){
    this.jobs=event.target.checked;
    this.userData.notifications.jobs=this.jobs;
  }

  eventCheckforResults(event){
    this.results=event.target.checked;
    this.userData.notifications.results=this.results;
  }

  saveSettings(){
    let tmpUser=this.userData;
    let tmpAllUsers=this.allUsers;
    if(this.blogs === undefined){
      this.blogs=this.userData.notifications.blogs;
    }
    if(this.chats === undefined){
      this.chats=this.userData.notifications.chats;
    }
    if(this.reviews === undefined){
      this.reviews=this.userData.notifications.reviews;
    }
    if(this.busses === undefined){
      this.busses=this.userData.notifications.busses;
    }
    if(this.trains === undefined){
      this.trains=this.userData.notifications.trains;
    }
    if(this.flights === undefined){
      this.flights=this.userData.notifications.flights;
    }
    if(this.hotels === undefined){
      this.hotels=this.userData.notifications.hotels;
    }
    if(this.restaurants === undefined){
      this.restaurants=this.userData.notifications.restaurants;
    }
    if(this.jobs === undefined){
      this.jobs=this.userData.notifications.jobs;
    }
    if(this.results === undefined){
      this.results=this.userData.notifications.results;
    }
    for(let user of tmpAllUsers){
      if(user.id == this.userData.id){
        user.notifications.blogs=this.blogs;
        user.notifications.chats=this.chats;
        user.notifications.reviews=this.reviews;
        user.notifications.busses=this.busses;
        user.notifications.trains=this.trains;
        user.notifications.flights=this.flights;
        user.notifications.hotels=this.hotels;
        user.notifications.restaurants=this.restaurants;
        user.notifications.jobs=this.jobs;
        user.notifications.results=this.results;
      }
    }
    tmpUser.notifications.blogs=this.blogs;
    tmpUser.notifications.chats=this.chats;
    tmpUser.notifications.reviews=this.reviews;
    tmpUser.notifications.busses=this.busses;
    tmpUser.notifications.trains=this.trains;
    tmpUser.notifications.flights=this.flights;
    tmpUser.notifications.hotels=this.hotels;
    tmpUser.notifications.restaurants=this.restaurants;
    tmpUser.notifications.jobs=this.jobs;
    tmpUser.notifications.results=this.results;
    localStorage.setItem('user',JSON.stringify(tmpUser));
    localStorage.setItem('users',JSON.stringify(tmpAllUsers));
    alert('Settings saved...')
  }
}
