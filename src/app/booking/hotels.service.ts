import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  img1 = 'assets/images/hotels/hotel1.jfif';
  img2 = 'assets/images/hotels/hotel2.jfif';
  img3 = 'assets/images/hotels/hotel3.jfif';
  img4 = 'assets/images/hotels/hotel4.jfif';
  img5 = 'assets/images/hotels/hotel5.jfif';
  img6 = 'assets/images/hotels/hotel6.jfif';
  img7 = 'assets/images/hotels/hotel7.jfif';
  allHotels = [
    {
      id : 1,
      name : 'Hotel Hayat',
      location : 'Hyderabad',
      image : this.img1,
    },
    {
      id : 2,
      name : 'Red Hat',
      location : 'Mumbai',
      image : this.img2,
    },
    {
      id : 3,
      name : 'Novotel',
      location : 'Bangalore',
      image : this.img3,
    },
    {
      id : 4,
      name : 'The New View',
      location : 'Hyderabad',
      image : this.img4,
    },
    {
      id : 5,
      name : 'Crowne Plaza',
      location : 'Vizag',
      image : this.img5,
    },
    {
      id : 6,
      name : 'University Inn.',
      location : 'Hyderabad',
      image : this.img6,
    },
    {
      id : 7,
      name : 'Hotel Bliss',
      location : 'New Delhi',
      image : this.img7,
    },
  ]
  constructor() { }
}