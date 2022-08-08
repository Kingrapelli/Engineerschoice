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
  constructor(private authService:AuthService) { }

  ngOnInit() {
   
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

  saveSettings(){
    let tmpUser=this.userData;
    let tmpAllUsers=this.allUsers;
    if(this.blogs === undefined){
      this.blogs=this.userData.notifications.blogs;
    }
    if(this.chats === undefined){
      this.chats=this.userData.notifications.chats;
    }
    for(let user of tmpAllUsers){
      if(user.id == this.userData.id){
        user.notifications.blogs=this.blogs;
        user.notifications.chats=this.chats;
      }
    }
    tmpUser.notifications.blogs=this.blogs;
    tmpUser.notifications.chats=this.chats;
    localStorage.setItem('user',JSON.stringify(tmpUser));
    localStorage.setItem('users',JSON.stringify(tmpAllUsers));
  }
}
