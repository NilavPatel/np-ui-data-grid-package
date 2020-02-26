import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataSource, DataTypes } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';

@Component({
  selector: 'app-columns-grid',
  templateUrl: './columns-grid.component.html',
  styleUrls: ['./columns-grid.component.css']
})
export class ColumnsGridComponent implements OnInit {


  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number, onCellClick: this.onCellClick, width: 200 },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String, width: 200 },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date },
      { dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number, rightAlignText: true },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean, styleClass: "txt-red" }];

    this.dataService.getAll().subscribe((data: any) => {
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }

  onCellClick(event, column, data) {
    alert("Column: " + column.dataField + " , rowKey:" + data.Id);
  }
}
