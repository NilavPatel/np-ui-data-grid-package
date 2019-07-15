import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NpColumn, NpDataSource, CustomStore } from 'projects/np-ui-data-grid/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gridColumns: any[];
  gridDataSource: NpDataSource;
  gridDataSource1: NpDataSource;
  data: any[];
  @ViewChild("actionButtonsTemplate", { static: true }) actionButtonsTemplate: TemplateRef<any>;
  @ViewChild("birthDateColumnTemplate", { static: true }) birthDateColumnTemplate: TemplateRef<any>;

  ngOnInit() {
    var that = this;

    this.data = this._getDataList(1000);

    this.gridColumns = [
      { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: "number", sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
      { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: "string", sortEnabled: true, filterEnabled: true },
      { dataField: "LastName", visible: true, width: 150, caption: "Last Name", dataType: "string" },
      { dataField: "BirthDate", visible: true, width: 150, caption: "Birth Date", dataType: "date", filterEnabled: true, cellTemplate: this.birthDateColumnTemplate },
      { dataField: "Age", visible: true, width: 100, dataType: "number", sortEnabled: true, filterEnabled: true, styleClass: "color-red" },
      { dataField: "Active", visible: true, width: 150, caption: "Is Active?", dataType: "boolean", filterEnabled: true, },
      { visible: true, width: 100, cellTemplate: this.actionButtonsTemplate }];

      /** for client side grid */
    this.gridDataSource = new NpDataSource();
    this.gridDataSource.isServerOperations = false;
    this.gridDataSource.data = this.data;
    this.gridDataSource.total = this.data.length;

    /** for server side grid */
    this.gridDataSource1 = new NpDataSource();
    this.gridDataSource1.isServerOperations = true;
    this.gridDataSource1.load = function (pageNumber, pageSize) {
      return new Promise((resolve, reject) => {
        var data = that._fetchDataApi(pageNumber, pageSize);
        var result = new CustomStore();
        result.data = data;
        result.total = 1000;
        resolve(result)
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

  _fetchDataApi(pageNumber: number, pageSize: number) {
    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, 1000 - 1);
    return this.data.slice(startIndex, endIndex + 1);
  }

  _getDataList(count: number) {
    var names = ["Nilav", "Hemal", "Hardik", "Brijesh"];
    var surNames = ["Patel", "Patidar"];

    var data = [];
    for (var i = 1; i <= count; i++) {
      data.push(getDataRow(i));
    }

    return data;

    function getDataRow(id) {
      return {
        Id: id,
        FirstName: names[Math.floor(Math.random() * names.length)],
        LastName: surNames[Math.floor(Math.random() * surNames.length)],
        Age: Math.floor(Math.random() * 80) + 1,
        Active: (Math.round(Math.random() % 2) == 0),
        BirthDate: new Date()
      }
    }
  }
}
