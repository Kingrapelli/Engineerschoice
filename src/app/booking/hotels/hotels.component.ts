import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HotelsService } from '../hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
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
export class HotelsComponent implements OnInit {

  allUnivercities:any;
  @ViewChild('searchHotels', /* TODO: add static flag */ {static: false}) searchHotels: ElementRef;
  verticalPlacement: string; /* left(default), right */
  chatToggleInverse: string;
  chatToggle: string;
  hotelData:any={};
  hotelBookingForm:any;
  public config: any;
  cost:any = 0;
  revenue:any;
  constructor(private service:HotelsService,private formBuilder:FormBuilder,private authService:AuthService) {
    this.verticalPlacement = 'left';
    this.chatToggleInverse = 'in';
    this.chatToggle = 'out';
   }

  ngOnInit() {
    this.hotelBookingForm= this.formBuilder.group({
      typeOfRoom:[''],
      noOfRooms:[''],
      fromDate:[''],
      toDate:[''],
      cost:['0']
    })
  }

  getCostValue(){
    this.cost= (this.hotelBookingForm.controls['noOfRooms'].value) * 360;
  }

  public get allHotels(){
    return this.service.allHotels;
  }

  searchHotelsList(e: Event){
    const search = (this.searchHotels.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const hotelList = document.querySelectorAll('.card .card-body');

    Array.prototype.forEach.call((hotelList), function(elements, index) {
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

  bookingHotel(){
    let formValue=this.hotelBookingForm.value;
    this.revenue=(formValue.cost/100)*10;
    let tmpBooking={
      typeOfRoom:formValue.typeOfRoom,
      noOfRooms: formValue.noOfRooms,
      fromDate : formValue.fromDate,
      toDate : formValue.toDate,
      cost : formValue.cost,
      category : 'hotel'
    }
    this.authService.saveIntoBookings(tmpBooking,this.revenue, this.hotelData);
    this.chatToggle = 'out';
    alert(this.hotelData.name + "hotel booked successfully");
  }

  // toggleChat(id) {
  //   this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
  //   this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
  //   this.getHotelDetails(id);
  // }

  openHotelDetails(id:any) {
    this.chatToggle =  'in';
    // this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
    this.getHotelDetails(id);
  }

  closeHotelDetails(){
    this.chatToggle = 'out';
  }

  getHotelDetails(id:any){
    for(let hotel of this.allHotels){
      if(id == hotel.id)
      this.hotelData=hotel;
    }
  }
}
