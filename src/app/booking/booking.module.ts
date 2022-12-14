import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import { FlightsComponent } from './flights/flights.component';
import { TrainsComponent } from './trains/trains.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FoodComponent } from './food/food.component';
import { RestaurantdetailsComponent } from './restaurantdetails/restaurantdetails.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { BusComponent } from './bus/bus.component';;

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes:Routes=[
  {
    path:'bus',
    component:BusComponent,
    data: {
      breadcrumb: 'Buses',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of Buses',
      status: true
    }
  },
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
  },
  {
    path:'food',
    component:FoodComponent,
    data: {
      breadcrumb: 'Food Section',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of Restaurants',
      status: true
    }
  },
  {
    path:'restaurant-details/:id',
    component:RestaurantdetailsComponent,
    data: {
      breadcrumb: 'Restaurants',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Below are list of Food items',
      status: true
    }
  }
]

@NgModule({
  declarations: [HotelsComponent, FlightsComponent, TrainsComponent, FoodComponent, RestaurantdetailsComponent, BusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class BookingModule { }
