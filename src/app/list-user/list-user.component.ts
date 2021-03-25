import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TraineeService } from '../trainee.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit {

  constructor(private trainee: TraineeService) {

  }
  collection: any;

  ngOnInit(): void {
    this.trainee.getList().subscribe((result) => {
      console.warn(result);
      this.collection = result;
    });
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
}
