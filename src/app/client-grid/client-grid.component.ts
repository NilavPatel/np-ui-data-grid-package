import { Component, TemplateRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource, DataTypes, NpUiDataGridComponent } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-client-grid',
  templateUrl: './client-grid.component.html',
  styleUrls: ['./client-grid.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ClientGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource>;

  @ViewChild("actionButtonsTemplate", { static: true }) actionButtonsTemplate: TemplateRef<any>;
  @ViewChild("birthDateColumnTemplate", { static: true }) birthDateColumnTemplate: TemplateRef<any>;
  @ViewChild("summaryTemplate", { static: true }) summaryTemplate: TemplateRef<any>;

  @ViewChild("serverSideGrid", { static: true }) serverSideGrid: NpUiDataGridComponent;

  _toggleColumn: boolean = true;
  showFilters: boolean = true;
  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.gridColumns = [
      { dataField: "Id", visible: true, width: 200, caption: "Id", dataType: DataTypes.Number, sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
      { dataField: "FirstName", visible: true, width: 200, caption: "First Name", dataType: DataTypes.String, sortEnabled: true, filterEnabled: true },
      { dataField: "LastName", visible: true, width: 200, caption: "Last Name", dataType: DataTypes.String },
      { dataField: "BirthDate", visible: true, width: 200, caption: "Birth Date", dataType: DataTypes.Date, filterEnabled: true, cellTemplate: this.birthDateColumnTemplate },
      { dataField: "Age", visible: true, width: 200, dataType: DataTypes.Number, sortEnabled: true, filterEnabled: true, styleClass: "color-red", rightAlignText: true },
      { dataField: "Active", visible: true, width: 200, caption: "Is Active?", dataType: DataTypes.Boolean, filterEnabled: true, },
      { visible: true, width: 200, cellTemplate: this.actionButtonsTemplate }];

    this.gridDataSource = new BehaviorSubject(null);

    this.onLoadData();
  }

  onLoadData() {
    this.dataService.getAll().subscribe((data: any) => {
      // for client side data pass total is 0, as it will calculate total from length of array.
      var dataSource = new DataSource(data, 0, { totalCount: 1000 });
      this.gridDataSource.next(dataSource);
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
