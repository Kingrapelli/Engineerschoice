import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  external?:any;
  role?:any;
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home',
        role : ''
      },
      {
        state: 'basic',
        short_label: 'B',
        name: 'Job Notifications',
        type: 'sub',
        icon: 'ti-announcement',
        role: '',
        children: [
          {
            state: 'government',
            name: 'Government',
            type: 'sub',
            children: [
              {
                state: 'all',
                name: 'All',
              },
              {
                state: 'bySSC',
                name: 'Based on SSC',
              },
              {
                state: 'byDiploma',
                name: 'Based on Diploma',
              },
              {
                state: 'byInter',
                name: 'Based on Inter',
              },
              {
                state: 'byGraduation',
                name: 'Based on Graduation',
              }
            ]
          },
          {
            state: 'private',
            name: 'Private',
            type: 'sub',
            children :[
              {
                state: 'it',
                name: 'IT Sector',
              },
              {
                state: 'civil',
                name: 'Civil Sector',
              }
            ]
          }
        ]
      },
      {
        state: 'results',
        short_label: 'n',
        name: 'Results',
        type: 'link',
        icon: 'ti-receipt',
        role: ''
      },
      {
        state: 'blogs',
        short_label: 'n',
        name: 'Blogs',
        type: 'link',
        icon: 'ti-receipt',
        role: ''
      },
      {
        state: 'audits',
        short_label: 'n',
        name: 'Audits',
        type: 'link',
        icon: 'ti-layout-sidebar-left',
        role : 'Super Admin'
      },
    ],
  },
  {
    label: 'Career Growth',
    main: [
      {
        state: 'map',
        short_label: 'M',
        name: 'Career Map',
        type: 'link',
        icon: 'ti-map-alt',
        role:''
      },
      {
        state: 'learn',
        short_label: 'M',
        name: 'Learn',
        type: 'link',
        icon: 'ti-notepad',
        role:''
      },
      {
        state: 'authentication',
        short_label: 'A',
        name: 'Authentication',
        type: 'sub',
        icon: 'ti-id-badge',
        role:'',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Login',
            target: true
          }, {
            state: 'registration',
            type: 'link',
            name: 'Registration',
            target: true
          }
        ]
      },
      // {
      //   state: 'user-profile',
      //   short_label: 'U',
      //   name: 'User Profile',
      //   type: 'link',
      //   icon: 'ti-user',
      //   role:''
      // },
      // {
      //   state: 'friend-profile',
      //   short_label: 'U',
      //   name: 'Friend Profile',
      //   type: 'link',
      //   icon: 'ti-user',
      //   role:''
      // }
    ]
  },
  {
    label: 'Find Out',
    main: [
      { 
        state: 'findout',
        short_label: 'A',
        name: 'Colleges',
        type: 'sub',
        icon: 'ti-id-badge',
        role:'',
        children: [
          {
            state: 'intermediate',
            short_label: 'U',
            name: 'Intermediate',
            type: 'link',
            icon: 'ti-user',
            role:''
          },
          {
            state: 'polytechnic',
            short_label: 'U',
            name: 'Diploma',
            type: 'link',
            icon: 'ti-user',
            role:''
          },
          {
            state: 'universities',
            short_label: 'U',
            name: 'Universities',
            type: 'link',
            icon: 'ti-user',
            role:''
          },
        ]
      },
      {
        state: 'booking',
        short_label: 'A',
        name: 'Booking Section',
        type: 'sub',
        icon: 'ti-id-badge',
        role:'',
        children: [
          {
            state: 'bus',
            type: 'link',
            name: 'Bus',
            // target: true
          },
          {
            state: 'train',
            type: 'link',
            name: 'Train',
            // target: true
          },{
            state: 'flight',
            type: 'link',
            name: 'Flight',
            // target: true
          },{
            state: 'hotel',
            type: 'link',
            name: 'Hotels',
            // target: true
          },{
            state: 'food',
            type: 'link',
            name: 'Food',
            // target: true
          }
        ]
      },
    ]
  },
  {
    label: 'Jobs',
    main: [
      {
        state: 'find-Jobs',
        short_label: 'B',
        name: 'Find Jobs',
        type: 'link',
        icon: 'ti-stats-up',
        role:''
      },
      {
        state: 'events',
        short_label: 'B',
        name: 'Events',
        type: 'link',
        icon: 'ti-menu-alt',
        role:''
      }
    ]
  },
  // {
  //   label: 'Other',
  //   main: [
  //     {
  //       state: '',
  //       short_label: 'M',
  //       name: 'Menu Levels',
  //       type: 'sub',
  //       icon: 'ti-direction-alt',
  //       role:'',
  //       children: [
  //         {
  //           state: '',
  //           name: 'Menu Level 2.1',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.2',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.2.2',
  //               target: true
  //             }
  //           ]
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.3',
  //           target: true
  //         }, {
  //           state: '',
  //           name: 'Menu Level 2.4',
  //           type: 'sub',
  //           children: [
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.1',
  //               target: true
  //             },
  //             {
  //               state: '',
  //               name: 'Menu Level 2.4.2',
  //               target: true
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       state: 'simple-page',
  //       short_label: 'S',
  //       name: 'Simple Page',
  //       type: 'link',
  //       icon: 'ti-layout-sidebar-left',
  //       role:''
  //     }
  //   ]
  // }, 
  {
    label: 'Support',
    main: [
      {
        state: 'Upgrade To Pro',
        short_label: 'U',
        // external: 'https://codedthemes.com/item/guru-able-admin-template/',
        name: 'Upgrade To Pro',
        type: 'external',
        icon: 'ti-layout-list-post',
        target: true,
        role:''
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
