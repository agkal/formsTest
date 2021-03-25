import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
/**
 * Class representing searched users.
 */
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  /*Enables json download link*/
  willDownload = false;
  /*Stores json data for users*/
  myData = null;
  /*Pagination value*/
  p: number = 1;
  /*Search user component key*/
  key: string = 'course';
  /*Sorting function*/
  reverse: boolean = false;
  /*Table decorator*/
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  /*Get searched value*/
  searchedValue: any;
  /*Contains users list data after each refresh*/
  usersList: any;
  /*Filtered person data object*/
  selectedPerson: any = null;
  /*Details display controller*/
  detailsEnabled: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.usersList = this.myData;
  }

  /**
  * function to search users data based on filtering the keyword
  * */
  search() {
    this.ngOnInit();
    this.searchedValue = this.searchedValue.toLocaleLowerCase();

    if (this.searchedValue == "") {

    } else {
      console.log(this.searchedValue.toLocaleLowerCase());
      this.usersList = this.usersList.filter(res => {
        return res.fullName.toLocaleLowerCase().match(this.searchedValue)
          || res.university.toLocaleLowerCase().match(this.searchedValue)
          || res.course.toLocaleLowerCase().match(this.searchedValue)
          || res.email.toLocaleLowerCase().match(this.searchedValue)
          || res.phone.toLocaleLowerCase().match(this.searchedValue)
          || String(res.passingYear).match(this.searchedValue)
          || res.city.toLocaleLowerCase().match(this.searchedValue);
      });
    }
  }

  /**
  * sorting user option
  * */
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }

  /**
  * exports registered data to excel
  * */
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }
  /**
  * display the selected users details
  * @param {$event} - field event
  * @param {person} - person object for selected user
  * */
  selectPerson($event, person) {
    this.selectedPerson = person;
    this.detailsEnabled = true;

  }

  /**
  * import excel file and converts into json data object
  * @param {$event} - ev --field event
  * */

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
      this.usersList = this.myData;
      console.log("myData:: ", this.myData);
    }
    reader.readAsBinaryString(file);
  }

  /**
  * downloads into json format
  * @param {data} - json data value
  * */
  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }
}
