import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  typeOfBlog=["Busses","Trains","Flights","Hotels","Restaurants","Jobs","Results"];
  default: string = 'Hotels';
  user:any;
  allBlogs:any;
  formData = new FormData();
  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
  
  constructor(private blogsService:BlogsService, private cdRef : ChangeDetectorRef,
    private formBuilder:FormBuilder,private authService:AuthService) { 
    this.verticalPlacement = 'left';
    this.chatToggleInverse = 'in';
    this.chatToggle = 'out';
  }

  ngOnInit() {
    this.addBlogForm=this.formBuilder.group({
      typeOfRoom:[''],
      image:['', Validators.required],
      location:[''],
      content:['']
    });
    this.getUser();
    this.getAllBlogs();
    // this.addBlogForm.controls['typeOfRoom'].setValue(this.default, {onlySelf: true});
    setInterval(() => {
      this.getAllBlogs();
    }, 2000);
  }

  async getUser(){
    const localUser = JSON.parse(localStorage.getItem('user'));
    this.authService.getUserById(this.authService.user ? this.authService.user.id : localUser.id).subscribe(res=>{
      this.user = res;
    });
  }

  getAllBlogs(){
    this.blogsService.getAllBlogs().subscribe((res:any)=>{
      this.allBlogs = res;
    })
  }

  openAddBlog(){
    this.chatToggle =  'in';
  }

  closeAddBlog(){
    this.chatToggle = 'out';
    // this.addBlogForm.reset();
    this.fileInputRef.nativeElement.value = "";
    this.addBlogForm.controls['image'].reset();
    this.formData.delete('image');
  }

  onSubmitAddBlog(){
    let date = new Date();
    let tmpBlog:any={
      "senderId":this.user._id,
      "senderImage" : this.user.image,
      "image": null,
      "content": this.addBlogForm.value.content,
      "sendAt":date.toUTCString(),
      "sentBy":this.user.firstName,
      "location":this.addBlogForm.value.location,
      "typeOfBlog":this.blogType,
      likes :[],
      dislikes:[]
    };
    this.formData.append('blog',JSON.stringify(tmpBlog));
    this.blogsService.addBlog(this.formData).subscribe(res=>{
      this.getAllBlogs();
    });
    this.addBlogForm.reset();
    // this.chatToggle = 'out';
    this.closeAddBlog();
  }

  readUrl(e:any) {
    this.formData.append('image',e.target.files[0]);
  }

  public get allUsers(){
    return JSON.parse(localStorage.getItem('users'));
  }

  getLikesData(likes){
    return likes.find(id => id === this.user._id);
  }

  getDisLikesData(dislikes){
    return dislikes.find(id=> id === this.user._id);
  }

  performLikesForBlog(id, senderid, functionname){
    let params = {
      id : id,
      senderid : senderid,
      userid : this.user._id,
      functionname : functionname
    }
    let _params = this.authService.commonParams({id, senderid, functionname});
    this.blogsService.performLikesForBlog(params).subscribe(res=>{
      this.getAllBlogs();
    })
  }
}
