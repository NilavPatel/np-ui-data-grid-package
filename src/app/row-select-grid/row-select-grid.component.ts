import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource, DataTypes, NpUiDataGridComponent } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-row-select-grid',
  templateUrl: './row-select-grid.component.html',
  styleUrls: ['./row-select-grid.component.css']
})
export class RowSelectGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource> = new BehaviorSubject(null);

  @ViewChild("singleSelectGrid", { static: true }) singleSelectGrid: NpUiDataGridComponent;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date },
      { dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean }];

    this.dataService.getAll().subscribe((data: any) => {
      // for client side data pass total is 0, as it will calculate total from length of array.
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }

  onSelectRow($event) {
    alert("selected rows:" + $event.data);
  }

  onDeselectRow($event) {
    alert("de selected rows:" + $event.data);
  }

  getSelectedRows() {
    var selectedRows = this.singleSelectGrid.getSelectedRowKeys();
    alert(selectedRows);
  }

}
