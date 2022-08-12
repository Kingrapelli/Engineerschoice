import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  // allRestaurants:any;
  isVeg:any=false;
  isNonVeg:any=false;
  @ViewChild('searchRestaurant') searchRestaurant: ElementRef;

  constructor(private foodService:FoodService) { }

  ngOnInit() {
    // this.allRestaurants=this.foodService.restaurants;
  }

  public get allRestaurants(){
    return this.foodService.restaurants;
  }

  searchRestaurants(e: Event){
    const search = (this.searchRestaurant.nativeElement.value).toLowerCase();
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

}
