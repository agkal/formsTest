import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appData = [];
  onSubmit(data) {
    console.warn(data);
    this.appData = data;
    console.warn("app data: ", this.appData);

  }
}
