import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './shared/settings/settings.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AuthComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  //     }
  //   ]
  // },
  {
    path:'login',
    // canActivate:[AuthGuard],
    component:LoginComponent
  },
  {
    path: '',
    // canActivate:[AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      }, {
        path: 'basic',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/ui-elements/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/ui-elements/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'bootstrap-table',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'user-profile',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'friend-profile',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/user/friendprofile/friendprofile.module').then(m => m.FriendprofileModule)
      }, {
        path: 'simple-page',
        canActivate:[AuthGuard],
        loadChildren: () => import('./pages/simple-page/simple-page.module').then(m => m.SimplePageModule)
      },
      {
        path :'findout',
        canActivate:[AuthGuard],
        loadChildren:()=>import('./findout/findout.module').then(m=> m.FindoutModule)
      },
      {
        path:'booking',
        canActivate:[AuthGuard],
        loadChildren:()=>import('./booking/booking.module').then(m=>m.BookingModule)
      },
      {
        path:'events',
        canActivate:[AuthGuard],
        loadChildren:()=>import('./events/events.module').then(m=>m.EventsModule)
      },
      {
        path:'blogs',
        canActivate:[AuthGuard],
        loadChildren:()=>import('./blogs/blogs.module').then(m=> m.BlogsModule)
      },{
        path:'settings',
        canActivate:[AuthGuard],
        component:SettingsComponent,
        data: {
          breadcrumb: 'Settings',
          icon: 'icofont-justify-all bg-c-green',
          breadcrumb_caption: 'Here you can change the settings',
          status: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
