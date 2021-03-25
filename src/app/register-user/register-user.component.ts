import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TraineeService } from '../trainee.service';

/**
 * Class representing registered user.
 */
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  /**
   * Selected url for file path
   * @type {string}
   */
  url = "C:\Users\abdul\Downloads\ScoreSheet.xlsx";
  /**
   * submit alert variable
   * @type {boolean}
   */
  saveSubmit: boolean = false;

  /**
   * Reactive form group
   * @type {FormGroup}
   */
  addTrainee = new FormGroup({
    course: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    passingYear: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    university: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  })

  /**
   * @constructor
   * @param {TraineeService} trainee - The trainee service.
   */
  constructor(private trainee: TraineeService) { }

  ngOnInit(): void {
  }

  /**
   * Save register user data in service
   * @param {voud}
   * @return {void}
   */
  onSubmit() {
    this.trainee.saveTrainee(this.addTrainee.value).subscribe((result) => {
      console.warn("result is here:", result);
    });
    this.saveSubmit = true;
  }

  /**
   * get course field value
   */
  get course() {
    return this.addTrainee.get('course');
  }
  /**
   * get fullName field value
   */
  get fullName() {
    return this.addTrainee.get('fullName');
  }
  /**
   * get email field value
   */
  get email() {
    return this.addTrainee.get('email');
  }
  /**
   * get phone field value
   */
  get phone() {
    return this.addTrainee.get('phone');
  }
  /**
   * get university field value
   */
  get university() {
    return this.addTrainee.get('university');
  }
  /**
   * get passingYear field value
   */
  get passingYear() {
    return this.addTrainee.get('passingYear');
  }
  /**
   * get city field value
   */
  get city() {
    return this.addTrainee.get('city');
  }
}
