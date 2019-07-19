import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NpDataSource, CustomStore } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gridColumns: any[];
  gridDataSource: NpDataSource;
  gridDataSource1: NpDataSource;
  @ViewChild("actionButtonsTemplate", { static: true }) actionButtonsTemplate: TemplateRef<any>;
  @ViewChild("birthDateColumnTemplate", { static: true }) birthDateColumnTemplate: TemplateRef<any>;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    var that = this;

    this.gridColumns = [
      { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: "number", sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
      { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: "string", sortEnabled: true, filterEnabled: true },
      { dataField: "LastName", visible: true, width: 150, caption: "Last Name", dataType: "string" },
      { dataField: "BirthDate", visible: true, width: 150, caption: "Birth Date", dataType: "date", filterEnabled: true, cellTemplate: this.birthDateColumnTemplate },
      { dataField: "Age", visible: true, width: 100, dataType: "number", sortEnabled: true, filterEnabled: true, styleClass: "color-red" },
      { dataField: "Active", visible: true, width: 150, caption: "Is Active?", dataType: "boolean", filterEnabled: true, },
      { visible: true, width: 100, cellTemplate: this.actionButtonsTemplate }];

    this.dataService.getAll().subscribe((data: any) => {
      /** for client side grid */
      this.gridDataSource = new NpDataSource();
      this.gridDataSource.data = data;
    });

    /** for server side grid */
    this.gridDataSource1 = new NpDataSource();
    this.gridDataSource1.isServerOperations = true;
    this.gridDataSource1.load = function (pageNumber, pageSize, sortColumns, filterColumns) {
      return new Promise((resolve, reject) => {
        var reqBody = {pageNumber:pageNumber, pageSize:pageSize, sortColumns:sortColumns, filterColumns:filterColumns}
        that.dataService.getDataUsingLoadOptions(reqBody).subscribe((data: any) => {
          var result = new CustomStore();
          result.data = data.data;
          result.total = data.total;
          resolve(result)
        });
      });
    }
  }

  cellClicked(event: any, column: any, row: any) {
    alert("column " + column.dataField + " clicked. Value is " + row[column.dataField]);
  }

  onActionClick(rowData: any, event: any, $event) {
    $event.stopPropagation();
    if (event == "Edit") {
      alert('Edit button click for row: ' + rowData.Id);
    }
    if (event == "Delete") {
      alert('Delete button click for row: ' + rowData.Id);
    }
  }

}
