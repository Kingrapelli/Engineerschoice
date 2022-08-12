import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {MenuItems} from '../../shared/menu-items/menu-items';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
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
export class AdminComponent implements OnInit {
  navType: string; /* st1, st2(default), st3, st4 */
  themeLayout: string; /* vertical(default) */
  layoutType: string; /* dark, light */
  verticalPlacement: string; /* left(default), right */
  verticalLayout: string; /* wide(default), box */
  deviceType: string; /* desktop(default), tablet, mobile */
  verticalNavType: string; /* expanded(default), offcanvas */
  verticalEffect: string; /* shrink(default), push, overlay */
  vNavigationView: string; /* view1(default) */
  pcodedHeaderPosition: string; /* fixed(default), relative*/
  pcodedSidebarPosition: string; /* fixed(default), absolute*/
  headerTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */
  logoTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */

  innerHeight: string;
  windowWidth: number;

  toggleOn: boolean;

  headerFixedMargin: string;
  navBarTheme: string; /* theme1, themelight1(default)*/
  activeItemTheme: string; /* theme1, theme2, theme3, theme4(default), ..., theme11, theme12 */

  isCollapsedMobile: string;
  isCollapsedSideBar: string;

  chatToggle: string;
  chatToggleInverse: string;
  chatInnerToggle: string;
  chatInnerToggleInverse: string;

  menuTitleTheme: string; /* theme1, theme2, theme3, theme4, theme5(default), theme6 */
  itemBorder: boolean;
  itemBorderStyle: string; /* none(default), solid, dotted, dashed */
  subItemBorder: boolean;
  subItemIcon: string; /* style1, style2, style3, style4, style5, style6(default) */
  dropDownIcon: string; /* style1(default), style2, style3 */
  configOpenRightBar: string;
  isSidebarChecked: boolean;
  isHeaderChecked: boolean;

  @ViewChild('searchFriends') search_friends: ElementRef;

  public config: any;
  userData:any;
  allUsers:any;
  contactUsForm:any;
  openChatUser:any;
  chat:any;
  messageText:any;
  chatForm:any;
  notifications :any;
  from = new Date();
  date = this.from.toUTCString();
  // date = this.from.toLocaleTimeString();

  constructor(public menuItems: MenuItems,private service:AuthService,
    private router:Router,private fb:FormBuilder,private cdRef:ChangeDetectorRef) {
    this.navType = 'st5';
    this.themeLayout = 'vertical';
    this.vNavigationView = 'view1';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.deviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.pcodedHeaderPosition = 'fixed';
    this.pcodedSidebarPosition = 'fixed';
    this.headerTheme = 'theme1';
    this.logoTheme = 'theme1';

    this.toggleOn = true;

    this.headerFixedMargin = '80px';
    this.navBarTheme = 'themelight1';
    this.activeItemTheme = 'theme4';

    this.isCollapsedMobile = 'no-block';
    this.isCollapsedSideBar = 'no-block';

    this.chatToggle = 'out';
    this.chatToggleInverse = 'in';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'on';

    this.menuTitleTheme = 'theme5';
    this.itemBorder = true;
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.subItemIcon = 'style6';
    this.dropDownIcon = 'style1';
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;

    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributes(this.windowWidth);
    
    // dark
    /*this.setLayoutType('dark');
    this.headerTheme = 'theme5';
    this.logoTheme = 'theme5';*/

    // light-dark
    /*this.setLayoutType('dark');
    this.setNavBarTheme('themelight1');
    this.navType = 'st2';*/

    // dark-light
    // this.setNavBarTheme('theme1');
    // this.navType = 'st3';

  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.chat = JSON.parse(localStorage.getItem('chat'));
    // this.notifications = JSON.parse(localStorage.getItem('notifications'));
    // console.log(this.notifications);
    // this.chat.sort(function(a,b){
    //   return b.sentAt - a.sentAt;
    // });
    console.log(this.chat);
    console.log(this.userData.loggedin);
    if(this.userData.loggedin != true){
      this.router.navigate(['/login']);
    }
    this.setBackgroundPattern('pattern2');
    this.contactUsForm = this.fb.group({
      textInput:this.userData.firstName,
      inputMail:this.userData.email,
      inputContact:this.userData.mobile,
      message:''
    })
    this.chatForm = this.fb.group({
      messageText : ['']
    })
  }

  public get allNotifications(){
    this.notifications = JSON.parse(localStorage.getItem('notifications'));
    // console.log(this.notifications);
    let tmpNotifications=[];
    for (let notification of this.notifications){
      if(this.userData.id == notification.sentTo){
        tmpNotifications.push(notification);
      }
    }
    // console.log(tmpNotifications);
    // return this.notifications;
    return (tmpNotifications || '');
  }

  getUserId(id:any){
    let routerUser ;
    for(let user of this.allUsers){
      if(id == user.id){
        routerUser=user;
      }
    }
    this.service.getRoutedUser(routerUser);
  }

  async sendToAdmin(){
    console.log(this.contactUsForm.value);
    let sendTo = 3;
    let category = "Query";
    await this.service.sendingMessageToAdmin(this.contactUsForm.value,this.userData.id,sendTo,category);
    this.contactUsForm.controls['message'].setValue('');
    console.log('after setting to null',this.contactUsForm);
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
    }
    this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    // this.chat = JSON.parse(localStorage.getItem('chat'));
    // this.chat.sort(function(a,b){
    //   return b.sentAt - a.sentAt;
    // });
    this.cdRef.detectChanges();
  }

  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.cdRef.detectChanges();
  }

  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.cdRef.detectChanges();
  }

  closeChatDetails(){
    this.chatToggle = 'out';
    this.chatToggleInverse='out';
  }

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
    this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'off';
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.cdRef.detectChanges();
  }

  toggleChatInner(id:any) {
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
    this.chatInnerToggleInverse = this.chatInnerToggleInverse === 'off' ? 'on' : 'off';
    if(id && this.chatInnerToggle){
      for(let user of this.allUsers){
        if(id === user.id){
          this.openChatUser = user;
        }
      }
    }
    this.cdRef.detectChanges();
  }

  sendMessage(userId,openChatUserId){
    console.log(userId,this.chatForm.value.messageText,openChatUserId);
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    let tmpMsg :any;
    let category = 'message';
    tmpMsg = {
      "sentBy" : userId,
      "message" : this.chatForm.value.messageText,
      "sentTo" : openChatUserId,
      "sentAt" : this.from.toUTCString()
    }
    if(this.chatForm.value.messageText != (null || undefined)){
      for(let user of this.allUsers){
        if(user.id === userId){
          user.chat.push(tmpMsg);
          this.userData.chat.push(tmpMsg);
        }
      }
      for(let user of this.allUsers){
        if(user.id === openChatUserId){
          user.chat.push(tmpMsg);
        }
      }
    }
    console.log(this.allUsers);
    this.chatForm.reset();
    localStorage.setItem('users',JSON.stringify(this.allUsers));
    let openChatUser;
    for(let user of this.allUsers){
      if(user.id == openChatUserId){
        openChatUser=user;
      }
    }
    if(openChatUser.notifications.chats === true){
      this.service.sendingMessageToAdmin(tmpMsg,userId,openChatUserId,category);
    }
    this.cdRef.detectChanges();
  }

  searchFriendList(e: Event) {
    const search = (this.search_friends.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    // const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
    const friendList = document.querySelectorAll('.userlist-box');
    Array.prototype.forEach.call(friendList, function(elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }

  toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setSidebarPosition() {
    this.isSidebarChecked = !this.isSidebarChecked;
    this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '80px' : '';
  }

  setBackgroundPattern(pattern) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
  }

  setLayoutType(type: string) {
    this.layoutType = type;
    if (type === 'dark') {
      this.headerTheme = 'theme6';
      this.navBarTheme = 'theme1';
      this.logoTheme = 'theme6';
      document.querySelector('body').classList.add('dark');
    } else {
      this.headerTheme = 'theme1';
      this.navBarTheme = 'themelight1';
      this.logoTheme = 'theme1';
      document.querySelector('body').classList.remove('dark');
    }
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
    } else {
      this.navBarTheme = 'theme1';
    }
  }

  logout(){
    console.log('at logout..')
    // localStorage.clear();
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.userData.loggedin=false;
    this.userData.active=false;
    localStorage.setItem('user',JSON.stringify(this.userData));
  }

}
