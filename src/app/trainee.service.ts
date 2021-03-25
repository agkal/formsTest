import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  url = "http://localhost:3000/students";

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(this.url);
  }
  saveTrainee(data) {
    console.warn("service: ", data);
    return this.http.post(this.url, data);
  }
}
