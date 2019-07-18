import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NpDataSource, CustomStore } from 'projects/np-ui-data-grid/src/public-api';
import * as _ from 'lodash';

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

    /** for server side grid */
    this.gridDataSource1 = new NpDataSource();
    this.gridDataSource1.isServerOperations = true;
    this.gridDataSource1.load = function (pageNumber, pageSize, sortColumns, filterColumns) {
      return new Promise((resolve, reject) => {
        var data = that._fetchDataApi(pageNumber, pageSize, sortColumns, filterColumns);
        var result = new CustomStore();
        result.data = data.data;
        result.total = data.total;
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

  _fetchDataApi(pageNumber: number, pageSize: number, sortColumns: any[], filterColumns: any[]) {

    var data2 = this.data;

    if (filterColumns && filterColumns.length > 0) {
      data2 = this._filterDataSource(data2, filterColumns);
    }

    if (sortColumns && sortColumns.length > 0) {
      sortColumns.forEach(element => {
        data2 = _.orderBy(data2, element.column, element.sortDirection === 'asc' ? 'asc' : 'desc');
      });
    }

    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, 1000 - 1);
    return { data: data2.slice(startIndex, endIndex + 1), total: data2.length };
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

  _filterDataSource(data, filterColumns) {
    filterColumns.forEach(element => {
      if (element.filterType == "startWith") {
        data = _.filter(data, function (a) {
          return _.startsWith(a[element.column].toLowerCase(), element.filterString.toLowerCase());
        });
      } else if (element.filterType == "endWith") {
        data = _.filter(data, function (a) {
          return _.endsWith(a[element.column].toLowerCase(), element.filterString.toLowerCase());
        });
      } else if (element.filterType == "contains") {
        data = _.filter(data, function (a) {
          return a[element.column].toLowerCase().indexOf(element.filterString.toLowerCase()) !== -1;
        });
      } else if (element.filterType == "greaterThan") {
        data = _.filter(data, function (a) {
          return a[element.column] > parseInt(element.filterString);
        });
      } else if (element.filterType == "lessThan") {
        data = _.filter(data, function (a) {
          return a[element.column] < parseInt(element.filterString);
        });
      } else if (element.filterType == "equals") {
        if (element.dataType == "boolean") {
          if (element.filterString == "true") {
            data = _.filter(data, function (a) {
              return a[element.column] == true;
            });
          } else {
            data = _.filter(data, function (a) {
              return a[element.column] == false;
            });
          }
        } else {
          data = _.filter(data, function (a) {
            return a[element.column] === parseInt(element.filterString);
          });
        }
      } else if (element.filterType == "dateLessThan") {
        data = _.filter(data, function (a) {
          return a[element.column] < new Date(element.filterString);
        });
      } else if (element.filterType == "dateGreaterThan") {
        data = _.filter(data, function (a) {
          return a[element.column] > new Date(element.filterString);
        });
      } else if (element.filterType == "dateEquals") {
        data = _.filter(data, function (a) {
          return a[element.column] == new Date(element.filterString);
        });
      } else {
        data = _.filter(data, function (a) { return a[element.column] == element.filterString });
      }
    });
    return data;
  }
}
