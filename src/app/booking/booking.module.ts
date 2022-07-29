import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import { FlightsComponent } from './flights/flights.component';
import { TrainsComponent } from './trains/trains.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'train',
    component:TrainsComponent,
    data: {
      breadcrumb: 'Trains',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of Trains',
      status: true
    }
  },
  {
    path:'flight',
    component:FlightsComponent,
    data: {
      breadcrumb: 'Flights',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of Flights',
      status: true
    }
  },
  {
    path:'hotel',
    component:HotelsComponent,
    data: {
      breadcrumb: 'Hotels',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of Hotels',
      status: true
    }
  }
]

@NgModule({
  declarations: [HotelsComponent, FlightsComponent, TrainsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BookingModule { }
