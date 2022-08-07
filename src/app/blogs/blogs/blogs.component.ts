import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: [
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
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

export class BlogsComponent implements OnInit {
  verticalPlacement: string; /* left(default), right */
  chatToggleInverse: string;
  chatToggle: string;
  addBlogForm:any;
  url:any;
  isLiked=false;
  isDisliked=false;
  blogType:any;
  typeOfBlog=["Hotels","Restaurants","Buses","Jobs","Results"];
  default: string = 'Hotels';
  constructor(private blogsService:BlogsService,
    private formBuilder:FormBuilder,private authService:AuthService) { 
    this.verticalPlacement = 'left';
    this.chatToggleInverse = 'in';
    this.chatToggle = 'out';
  }

  ngOnInit() {
    this.addBlogForm=this.formBuilder.group({
      typeOfRoom:[''],
      image:[''],
      location:[''],
      content:['']
    });
    // this.addBlogForm.controls['typeOfRoom'].setValue(this.default, {onlySelf: true});
  }

  public get userData(){
    return JSON.parse(localStorage.getItem('user'));
  }

  public get allBlogs(){
    return this.blogsService.blogs;
  }

  openAddBlog(){
    this.chatToggle =  'in';
  }

  closeAddBlog(){
    this.chatToggle = 'out';
  }

  onSubmitAddBlog(){
    let date = new Date();
    let id=this.blogsService.blogs.length+1;
    let tmpBlog={
      id : id,
      "senderId":this.userData.id,
      "senderImage" : this.userData.image,
      "image":this.url,
      "content": this.addBlogForm.value.content,
      "sendAt":date.toUTCString(),
      "sentBy":this.userData.firstName,
      "location":this.addBlogForm.value.location,
      // "typeOfBlog":this.addBlogForm.value.typeOfBlog,
      "typeOfBlog":this.blogType,
      likes :[],
      dislikes:[]
    };
    console.log(tmpBlog);
    this.blogsService.addBlog(tmpBlog);
    this.addBlogForm.reset();
    this.chatToggle = 'out';
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  likeTheBlog(id,senderId){
    for(let blog of this.allBlogs){
      if(blog.id == id){
        blog.likes.push(this.userData.id);
      }
    }
    for(let blog of this.allBlogs){
      if(blog.id == id){
        for(let i=0;i<blog.dislikes.length;i++){
          if(blog.dislikes[i]==this.userData.id){
            blog.dislikes.splice(i,1);
          }
        }
      }
    }
    let payload:any
    for(let blog of this.allBlogs){
      if(blog.id == id){
        payload = {
          message:"Liked your blog: "+blog.content,
        }
      }
    }
    this.authService.sendingMessageToAdmin(payload,this.userData.id,senderId,"blog");
  }

  deLikeTheBlog(id,senderId){
    for(let blog of this.allBlogs){
      if(blog.id == id){
        for(let i=0;i<blog.likes.length;i++){
          if(blog.likes[i]==this.userData.id){
            blog.likes.splice(i,1);
          }
        }
      }
    }
  }

  getLikesData(likes){
    return likes.find(id => id === this.userData.id);
  }

  getDisLikesData(dislikes){
    return dislikes.find(id=> id === this.userData.id);
  }

  dislikeBlog(id,senderId){
    for(let blog of this.allBlogs){
      if(blog.id == id){
        blog.dislikes.push(this.userData.id);
      }
    }
    for(let blog of this.allBlogs){
      if(blog.id == id){
        for(let i=0;i<blog.likes.length;i++){
          if(blog.likes[i]==this.userData.id){
            blog.likes.splice(i,1);
          }
        }
      }
    }
    let payload:any
    for(let blog of this.allBlogs){
      if(blog.id == id){
        payload = {
          message:"Disliked your blog: "+blog.content,
        }
      }
    }
    
    this.authService.sendingMessageToAdmin(payload,this.userData.id,senderId,"blog");
  }

  dedislikeBlog(id){
    for(let blog of this.allBlogs){
      if(blog.id == id){
        for(let i=0;i<blog.dislikes.length;i++){
          if(blog.dislikes[i]==this.userData.id){
            blog.dislikes.splice(i,1);
          }
        }
      }
    }
  }
  
}
