import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})

export class BasicLoginComponent implements OnInit {
  email:any;
  password:any;
  localData:any;
  sampleData:any;
  constructor(private router:Router,private cdRef:ChangeDetectorRef,private authService:AuthService) { }

  ngOnInit() {
    this.localData = JSON.parse(localStorage.getItem('userData'));
    // if(this.localData.loggedin == true){
    //   this.router.navigate(['/dashboard']);
    // }
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
  }

  onSubmitLoginForm(){
    // this.cdRef.detectChanges();
    // this.authService.signIn(this.email.value,this.password.value);
    this.sampleData = this.email.value,this.password.value;
    localStorage.setItem('sampleData',JSON.stringify(this.sampleData));
    console.log(this.email.value,this.password.value);
  }

}
