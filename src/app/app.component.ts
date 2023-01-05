import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Engineers Choice';

  constructor(private router: Router,private authService:AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.authService.isUserLoggedIn=false;

    // window.indexedDB = window.indexedDB;
    window.IDBTransaction = window.IDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange;
    
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }
    else{
    }
  }
}
