import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HotelsService } from '../hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  allUnivercities:any;
  @ViewChild('searchHotels', /* TODO: add static flag */ {static: false}) searchHotels: ElementRef;

  constructor(private service:HotelsService) { }

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
}
