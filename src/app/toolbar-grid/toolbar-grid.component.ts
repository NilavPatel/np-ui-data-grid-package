import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataSource, DataTypes } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar-grid',
  templateUrl: './toolbar-grid.component.html',
  styleUrls: ['./toolbar-grid.component.css']
})
export class ToolbarGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number, filterEnabled: true },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date },
      { dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean }];

    this.dataService.getAll().subscribe((data: any) => {
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }

}
