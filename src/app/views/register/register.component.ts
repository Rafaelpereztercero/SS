import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name : new FormControl('',Validators.required),
    lastname : new FormControl('',Validators.required),
    username : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
  })

  constructor(){}
  ngOnInit(): void {
  }

  onLogin(registerForm: any){
    console.log(registerForm);
  }

}
