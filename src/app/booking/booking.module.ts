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
  declarations: [HotelsComponent, FlightsComponent, TrainsComponent, FoodComponent, RestaurantdetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class BookingModule { }
