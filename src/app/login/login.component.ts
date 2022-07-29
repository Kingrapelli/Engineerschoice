import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:any;
  password:any;
  localData:any;
  sampleData:any;
  logInForm:any;
  constructor(private router:Router,private cdRef:ChangeDetectorRef,private authService:AuthService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.localData = JSON.parse(localStorage.getItem('user'));
    console.log(this.localData);
    // console.log(this.localData.loggedin);
    if(this.localData.loggedin == true){
      this.router.navigate(['/dashboard']);
    };
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.logInForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

    // this.email = new FormControl('', [Validators.required]);
    // this.password = new FormControl('', [Validators.required]);
  }

  onSubmitLoginForm(){
    // this.cdRef.detectChanges();
    // this.authService.signIn(this.email.value,this.password.value);
    this.sampleData = this.logInForm.value;
    console.log(this.sampleData);
    localStorage.setItem('sampleData',JSON.stringify(this.sampleData));
    this.authService.signIn(this.sampleData.email,this.sampleData.password);
  }

}
