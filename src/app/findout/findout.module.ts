import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnivercitiesComponent } from './univercities/univercities.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'universities',
    component:UnivercitiesComponent,
    data: {
      breadcrumb: 'Universities',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of Universities',
      status: true
    }
  }
]


@NgModule({
  declarations: [UnivercitiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FindoutModule { }
