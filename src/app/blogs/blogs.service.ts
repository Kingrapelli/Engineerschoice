import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  date=new Date();
  blogs=[
    {
      id:1,
      senderId:2,
      senderImage:'',
      image:'assets/images/avatar-1.jpg',
      content:"my first photo",
      sendAt:this.date.toUTCString(),
      sentBy:"Raj Kumar",
      location:"Hyderabad",
      typeOfBlog:"Pictures",
      likes:[],
      dislikes:[]
    },{
      id:2,
      senderId:1,
      senderImage:'',
      image:'assets/images/avatar-2.jpg',
      content:"my Second photo",
      sendAt:this.date.toUTCString(),
      sentBy: "Admin",
      location:"Hyderabad",
      typeOfBlog:"Pictures",
      likes:[],
      dislikes:[]
    },{
      id:3,
      senderId:3,
      senderImage:'',
      image:'assets/images/foods/lunch/nonveg/keemabiryani.jfif',
      content:"Added dish in Abhiruchi hotel",
      sendAt:this.date.toUTCString(),
      sentBy: "Super Admin",
      location:"Hyderabad",
      typeOfBlog:"Pictures",
      likes:[],
      dislikes:[]
    },
  ];
  constructor() { }

  addBlog(payload){
    this.blogs.unshift(payload)
  }
}
