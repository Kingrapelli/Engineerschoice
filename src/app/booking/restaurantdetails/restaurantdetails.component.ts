import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-restaurantdetails',
  templateUrl: './restaurantdetails.component.html',
  styleUrls: ['./restaurantdetails.component.scss'],
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
export class RestaurantdetailsComponent implements OnInit {
  // allRestaurants:any;
  restaurantData:any;
  quantity:any=0;
  bookings:any[]=[];
  verticalPlacement: string; /* left(default), right */
  chatToggleInverse: string;
  chatToggle: string;
  @ViewChild('searchFoods', /* TODO: add static flag */ {static: false}) searchFoods: ElementRef;
  constructor(private foodService:FoodService,private activatedRoute:ActivatedRoute) { 
    this.verticalPlacement = 'left';
    this.chatToggleInverse = 'in';
    this.chatToggle = 'out';
  }
  public get allRestaurants(){
    return this.foodService.restaurants;
  }
  ngOnInit() {
    const id =  parseInt(this.activatedRoute.snapshot.paramMap.get('id')); 
    for(let restaurant of this.allRestaurants){
      if(id == restaurant.id){
        this.restaurantData=restaurant;
      }
    }
    console.log(this.restaurantData);
  }

  searchFoodItems(e: Event){
    const search = (this.searchFoods.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const restaurantsList = document.querySelectorAll('.card .card-body');
  
    Array.prototype.forEach.call((restaurantsList), function(elements, index) {
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

  addingQuantity(id,quantity){
    let itemData;
    let tmpBookings:any=this.bookings;
    let matched:any=false;
    for(let item of this.restaurantData.items){
      if(item.id  == id){
        itemData=item;
      }
    }
    if(tmpBookings.length != 0){
      for(let booking of tmpBookings){
        if(itemData.id == booking.id){
          matched=true;
        }
      }
    }

    if(matched == true){
      for(let booking of tmpBookings){
        if(itemData.id == booking.id){
          booking.quantity=quantity;
        }
      }
    }
    else{
      tmpBookings.push(itemData);
    }
    this.bookings=[];
    for(let booking of tmpBookings){
      if(booking.quantity != 0)
        this.bookings.push(booking);
    }
    console.log(this.bookings);
  }
  bookingDetails(){
    if(this.bookings.length == 0){
      alert("Please order anything")
    }
    else
      this.chatToggle =  'in';
  }
  closeBookingDetails(){
    this.chatToggle = 'out';
  }

  ngOnDestroy(){
    for(let item of this.restaurantData.items){
      item=0;
    }
  }
}
