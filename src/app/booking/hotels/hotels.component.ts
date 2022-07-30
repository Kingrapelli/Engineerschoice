import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  constructor(private service:HotelsService) {
    this.verticalPlacement = 'left';
    this.chatToggleInverse = 'in';
    this.chatToggle = 'out';
   }

  ngOnInit() {
    this.loadAllUnivercities();
  }

  public get allHotels(){
    return this.service.allHotels;
  }

  loadAllUnivercities(){
    // this.findOutService.getAllUnivercities().subscribe((_res:any)=>{
    //   this.allUnivercities=_res;
    // })
  }

  searchHotelsList(e: Event){
    const search = (this.searchHotels.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    // let hotelList:any;
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

  // toggleChat(id) {
  //   this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
  //   this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
  //   this.getHotelDetails(id);
  // }

  openHotelDetails(id) {
    this.chatToggle =  'in';
    // this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
    this.getHotelDetails(id);
  }

  closeHotelDetails(){
    this.chatToggle = 'out';
  }

  getHotelDetails(id){
    for(let hotel of this.allHotels){
      if(id == hotel.id)
      this.hotelData=hotel;
    }
    console.log(this.hotelData);

  }
}
