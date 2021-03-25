import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
/*  loginForm = new FormGroup ({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
*/
  appData = [];
  onSubmit(data)
  {
    console.warn(data);
    this.appData = data;
    console.warn("app data: ",this.appData);

  }
/*
  get email(){
    return this.loginForm.get('email')
  }
*/
}
