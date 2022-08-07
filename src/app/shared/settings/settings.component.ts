import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  blogs:any;
  chats:any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
   
  }
  public get userData(){
    return JSON.parse(localStorage.getItem('user'));
  }

  eventCheckforBlogs(event){
    this.blogs=event.target.checked;
  }

  eventCheckforChats(event){
    this.chats=event.target.checked;
  }

  saveSettings(){
    console.log(this.blogs,this.chats);
  }
}
