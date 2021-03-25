import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TraineeService } from '../trainee.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private trainee: TraineeService) { }

  addTrainee = new FormGroup({
    course: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    passingYear: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    university: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),

  })


  ngOnInit(): void {

  }
  url = "C:\Users\abdul\Downloads\ScoreSheet.xlsx";

  saveSubmit: boolean = false;
  onSubmit() {
    //console.warn(data);
    this.trainee.saveTrainee(this.addTrainee.value).subscribe((result) => {
      console.warn("result is here:", result);
    });
    this.saveSubmit = true;
  }

  get course() {
    return this.addTrainee.get('course');
  }
  get fullName() {
    return this.addTrainee.get('fullName');
  }
  get email() {
    return this.addTrainee.get('email');
  }
  get phone() {
    return this.addTrainee.get('phone');
  }
  get university() {
    return this.addTrainee.get('university');
  }
  get passingYear() {
    return this.addTrainee.get('passingYear');
  }
  get city() {
    return this.addTrainee.get('city');
  }
}
