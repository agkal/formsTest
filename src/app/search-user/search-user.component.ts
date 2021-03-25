import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { AppComponent } from '../app.component';


type AOA = any[][];

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  constructor(appC: AppComponent) {
    console.warn("app component: ", appC.appData);
  }
  p: number = 1;

  ngOnInit(): void {
    this.team = this.myData;
  }


  search() {
    this.ngOnInit();
    this.teamName = this.teamName.toLocaleLowerCase();

    if (this.teamName == "") {

    } else {
      console.log(this.teamName.toLocaleLowerCase());
      this.team = this.team.filter(res => {
        return res.fullName.toLocaleLowerCase().match(this.teamName) || res.university.toLocaleLowerCase().match(this.teamName)
          || res.course.toLocaleLowerCase().match(this.teamName) || res.email.toLocaleLowerCase().match(this.teamName)
          || res.phone.toLocaleLowerCase().match(this.teamName) || String(res.passingYear).match(this.teamName)
          || res.city.toLocaleLowerCase().match(this.teamName);
      });
    }
  }

  key: string = 'course';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  teamName: any;
  team: any;

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  selectedPerson: any = null;
  detailsEnabled: boolean = false;


  selectPerson($event, person) {
    this.selectedPerson = person;
    this.detailsEnabled = true;

  }



  /****************************************/


  willDownload = false;
  myData = null;

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.setDownload(dataString);
      this.myData = jsonData['Sheet1'];
      this.team = this.myData;
      console.log("myData:: ", this.myData);
    }
    reader.readAsBinaryString(file);
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }
}
