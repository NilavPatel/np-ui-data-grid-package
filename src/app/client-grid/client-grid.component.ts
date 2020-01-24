import { Component, TemplateRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource, DataTypes, NpUiDataGridComponent } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';

@Component({
  selector: 'app-client-grid',
  templateUrl: './client-grid.component.html',
  styleUrls: ['./client-grid.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ClientGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: DataSource;
    
  @ViewChild("actionButtonsTemplate", { static: true }) actionButtonsTemplate: TemplateRef<any>;
  @ViewChild("birthDateColumnTemplate", { static: true }) birthDateColumnTemplate: TemplateRef<any>;
  @ViewChild("summaryTemplate", { static: true }) summaryTemplate: TemplateRef<any>;

  @ViewChild("serverSideGrid", { static: true }) serverSideGrid: NpUiDataGridComponent;

  _toggleColumn: boolean = true;
  showFilters: boolean = true;
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    var that = this;

    this.gridColumns = [
      { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: DataTypes.number, sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
      { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: DataTypes.string, sortEnabled: true, filterEnabled: true },
      { dataField: "LastName", visible: true, width: 150, caption: "Last Name", dataType: DataTypes.string },
      { dataField: "BirthDate", visible: true, width: 150, caption: "Birth Date", dataType: DataTypes.date, filterEnabled: true, cellTemplate: this.birthDateColumnTemplate },
      { dataField: "Age", visible: true, width: 100, dataType: DataTypes.number, sortEnabled: true, filterEnabled: true, styleClass: "color-red", rightAlignText: true },
      { dataField: "Active", visible: true, width: 150, caption: "Is Active?", dataType: DataTypes.boolean, filterEnabled: true, },
      { visible: true, width: 100, cellTemplate: this.actionButtonsTemplate }];

    this.dataService.getAll().subscribe((data: any) => {
      /** for client side grid */
      this.gridDataSource = new DataSource();
      this.gridDataSource.data = data;
      this.gridDataSource.summary = { total: 1000 };
    });
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
