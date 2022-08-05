import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  date=new Date();
  blogs=[
    {
      id:1,
      senderImage:'',
      image:'assets/images/avatar-1.jpg',
      content:"my first photo",
      sendAt:this.date.toUTCString(),
      sentBy:"Raj Kumar",
      likes:[],
      dislikes:[]
    },{
      id:2,
      senderImage:'',
      image:'assets/images/avatar-2.jpg',
      content:"my Second photo",
      sendAt:this.date.toUTCString(),
      sentBy: "Admin",
      likes:[],
      dislikes:[]
    },{
      id:3,
      senderImage:'',
      image:'assets/images/foods/lunch/nonveg/keemabiryani.jfif',
      content:"Added dish in Abhiruchi hotel",
      sendAt:this.date.toUTCString(),
      sentBy: "Super Admin",
      likes:[],
      dislikes:[]
    },
  ];
  constructor() { }

  addBlog(payload){
    this.blogs.unshift(payload)
  }
}
