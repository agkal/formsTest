import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TraineeService } from '../trainee.service';
import * as XLSX from 'xlsx';

/**
 * Class representing a list of users.
 */
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  /**
   * stores each user data object separately
   * @type {any}
   */
  collection: any;

  /**
   * decorator for referencing template details
   * @type {TABLE}
   */
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  /**
   * @constructor
   * @param {TraineeService} trainee - The trainee service.
   */
  constructor(private trainee: TraineeService) {
  }
  /**
   * On each run, invokes to get data from server to this.collection object
  */
  ngOnInit(): void {
    this.trainee.getList().subscribe((result) => {
      console.warn(result);
      this.collection = result;
    });
  }
  /**
   * exports data to the excell format
   * @param {void}
   */
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }
}
