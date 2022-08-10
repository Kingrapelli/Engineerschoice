import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:EventsComponent,
    data: {
      breadcrumb: 'Events',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of events',
      status: true
    }
  }
]

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EventsModule { }
