import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendprofileComponent } from './friendprofile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const routes:Routes=[
  {
    path:'',
    component:FriendprofileComponent,
    data: {
      breadcrumb: 'Friend Profile',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are details of Friend - Profile',
      status: true
    }
  }
]

@NgModule({
  declarations: [FriendprofileComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class FriendprofileModule { }
