import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  restaurants :any= [
    {
      id:1,
      "name":'Abhiruchi restaurant',
      "location" : 'Jayanagar, Bangalore',
      "opensAt" : '10:00 AM',
      "closesAt" : '11:00 PM',
      "image" : 'assets/images/restaurants/abhiruchi.jfif',
      "categories" : [{category:'Nonveg'}],
      "items":[
        {
          id:1,
          name : "Chapati with Chicken Curry",
          image:"assets/images/foods/lunch/nonveg/chapatinonveg.jfif",
          cost : 110,
          quantity:0,
        },
        {
          id:2,
          name : "Chicken Manchuriyan",
          image:"assets/images/foods/lunch/nonveg/chickenmanchuriyan.jfif",
          cost :  80,
          quantity:0,
        },
        {
          id:3,
          name : "Chicken Dum Biryani",
          image:"assets/images/foods/lunch/nonveg/dumbiryani.jfif",
          cost : 180,
          quantity:0,
        },
        {
          id:4,
          name : "Fish Biryani",
          image:"assets/images/foods/lunch/nonveg/fishbiryani.jfif",
          cost : 220,
          quantity:0,
        },
        {
          id:5,
          name : "Mutton Keema Biryani",
          image:"assets/images/foods/lunch/nonveg/keemabiryani.jfif",
          cost : 190,
          quantity:0,
        },
        {
          id:6,
          name : "Mutton Biryani",
          image:"assets/images/foods/lunch/nonveg/muttonbiryani.jfif",
          cost : 200,
          quantity:0,
        },
        {
          id:7,
          name : "Parota with chicken curry",
          image:"assets/images/foods/lunch/nonveg/parotanonveg.jfif",
          cost : 120,
          quantity:0,
        },
        {
          id:8,
          name : "Prawns Biryani",
          image:"assets/images/foods/lunch/nonveg/prawnsbiryani.jfif",
          cost : 180,
          quantity:0,
        },
        {
          id:9,
          name : "Chicken Tikka Biryani",
          image:"assets/images/foods/lunch/nonveg/tikkabiryani.jfif",
          cost : 200,
          quantity:0,
        }
      ]
    },
    {
      id:2,
      "name":'Kritinga restaurant',
      "location" : 'KPHB, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/kritinga1.jfif',
      "categories" : [{category:'Nonveg'}]
    },
    {
      id:3,
      "name":'Chillies restaurant',
      "location" : 'Charminar, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/chillies.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:4,
      "name":'Kritinga restaurant',
      "location" : 'NCR Layout, Bangalore',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/kritinga2.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:5,
      "name":'MRCB restaurant',
      "location" : 'Kukatpally, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/mrcb.jfif',
      "categories" : [{category:'Nonveg'}]
    },
    {
      id:6,
      "name":'Paradise restaurant',
      "location" : 'Paradise, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/paradise1.jfif',
      "categories" : [{category:'Nonveg'}]
    },
    {
      id:7,
      "name":'Paradise restaurant',
      "location" : 'Madhapur, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/paradise2.jfif',
      "categories" : [{category:'Nonveg'}]
    },
    {
      id:8,
      "name":'Pista House',
      "location" : 'Lingampalli, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/pistahouse.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:9,
      "name":'Anand Tiffin center',
      "location" : 'Begumpet, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/anand.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:10,
      "name":'Classic Tiffin center',
      "location" : 'Madhura nagar, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/classictiffins.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:11,
      "name":'Gravity Hotel',
      "location" : 'Koramangala, Bangalore',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/gravity.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:12,
      "name":'Narayana Tiffin center',
      "location" : 'Jayangar, Bangalore',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/narayanatiffins.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:13,
      "name":'Purna Tiffins',
      "location" : 'Yusufguda, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/purnatiffins.jfif',
      "categories" : [{category:'Veg'}]
    },
    {
      id:14,
      "name":'Anand Tiffin center',
      "location" : 'BHEL, Hyderabad',
      "opensAt" : '11:00 AM',
      "closesAt" : '10:00 PM',
      "image" : 'assets/images/restaurants/anand.jfif',
      "categories" : [{category:'Veg'}]
    }
  ];
  constructor() {}
}
