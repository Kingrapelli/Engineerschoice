import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FindoutService } from '../findout.service';

@Component({
  selector: 'app-univercities',
  templateUrl: './univercities.component.html',
  styleUrls: ['./univercities.component.scss']
})
export class UnivercitiesComponent implements OnInit {
  allUnivercities:any;
  @ViewChild('searchUnivercities', /* TODO: add static flag */ {static: false}) search_univercities: ElementRef;

  constructor(private findOutService:FindoutService) { }

  ngOnInit() {
    this.loadAllUnivercities();
  }
  loadAllUnivercities(){
    this.findOutService.getAllUnivercities().subscribe((_res:any)=>{
      this.allUnivercities=_res;
    })
  }
  searchUnivercitiesList(e: Event){
    const search = (this.search_univercities.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const friendList = document.querySelectorAll('.card .card-body');
    Array.prototype.forEach.call(friendList, function(elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        console.log(search_parent)
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }
}
