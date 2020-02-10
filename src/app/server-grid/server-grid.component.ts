import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataSource, NpUiDataGridComponent, DataTypes, CustomStore, SortDirections, State, FilterTypes } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';

@Component({
  selector: 'app-server-grid',
  templateUrl: './server-grid.component.html',
  styleUrls: ['./server-grid.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ServerGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource1: DataSource;
  _toggleColumn: boolean = true;
  showFilters: boolean = true;

  @ViewChild("actionButtonsTemplate", { static: true }) actionButtonsTemplate: TemplateRef<any>;
  @ViewChild("birthDateColumnTemplate", { static: true }) birthDateColumnTemplate: TemplateRef<any>;
  @ViewChild("summaryTemplate", { static: true }) summaryTemplate: TemplateRef<any>;

  @ViewChild("serverSideGrid", { static: true }) serverSideGrid: NpUiDataGridComponent;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    var that = this;

    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number, sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String, sortEnabled: true, filterEnabled: true },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date, filterEnabled: true, cellTemplate: this.birthDateColumnTemplate },
      { dataField: "Age", visible: true, dataType: DataTypes.Number, sortEnabled: true, filterEnabled: true, styleClass: "color-red", rightAlignText: true },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean, filterEnabled: true, },
      { visible: true, cellTemplate: this.actionButtonsTemplate }];

    /** for server side grid */
    this.gridDataSource1 = new DataSource();
    this.gridDataSource1.isServerOperations = true;
    this.gridDataSource1.load = function (pageNumber, pageSize, sortColumns, filterColumns) {
      return new Promise((resolve, reject) => {
        var reqBody = { pageNumber: pageNumber, pageSize: pageSize, sortColumns: sortColumns, filterColumns: filterColumns }
        that.dataService.getDataUsingLoadOptions(reqBody).subscribe((data: any) => {
          var result = new CustomStore();
          result.data = data.data;
          result.total = data.total;
          result.summary = { total: 1000 };
          resolve(result)
        });
      });
    }

    this.setStateForServerSideGrid();
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

  getSelectedRowKeys() {
    var keys = this.serverSideGrid.getSelectedRowKeys();
    alert(keys);
  }

  toggleFirstColumn() {
    this._toggleColumn = !this._toggleColumn;
    if (this._toggleColumn) {
      this.serverSideGrid.showColumnByIndex(0);
    } else {
      this.serverSideGrid.hideColumnByIndex(0);
    }
  }

  changeColumns() {
    var columns = this.serverSideGrid.getColumns();
    columns[1].visible = false;
    columns[2].visible = false;
    columns[0].sortDirection = SortDirections.Descending;
    this.serverSideGrid.setColumns(columns);
  }

  onSelectRow($event) {
    alert("selected rows:" + $event.data);
  }

  onDeselectRow($event) {
    alert("de selected rows:" + $event.data);
  }

  setStateForServerSideGrid() {
    var columns = [
      { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: DataTypes.Number, sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
      { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: DataTypes.String, sortEnabled: true, filterEnabled: true },
      { dataField: "LastName", visible: true, width: 150, caption: "Last Name", dataType: DataTypes.String },
      { dataField: "BirthDate", visible: true, width: 150, caption: "Birth Date", dataType: DataTypes.Date, filterEnabled: true, cellTemplate: this.birthDateColumnTemplate },
      { dataField: "Age", visible: true, width: 100, dataType: DataTypes.Number, sortEnabled: true, filterEnabled: true, styleClass: "color-red", filterValue: "50", filterOperator: FilterTypes.GreaterThan },
      { dataField: "Active", visible: true, width: 150, caption: "Is Active?", dataType: DataTypes.Boolean, filterEnabled: true, },
      { visible: true, width: 100, cellTemplate: this.actionButtonsTemplate }]
    var state = new State("Age more than 50", columns);
    this.serverSideGrid.setAllState([state]);
  }

  onInit() {
    console.log("grid initializing at" + new Date().toTimeString());
  }

  onAfterInit() {
    console.log("grid initialized at" + new Date().toTimeString());
  }

  goToPage(num) {
    this.serverSideGrid.goToPage(num);
  }

  clearFilters() {
    this.serverSideGrid.removeAllFilters();
  }

  clearSortings() {
    this.serverSideGrid.removeAllSortings();
  }

}
