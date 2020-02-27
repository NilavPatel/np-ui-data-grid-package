import { Component, OnInit } from '@angular/core';
import { DataSource, DataTypes } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-state-management-grid',
  templateUrl: './state-management-grid.component.html',
  styleUrls: ['./state-management-grid.component.css']
})
export class StateManagementGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number, sortEnable: true, filterEnable: true },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String, sortEnable: true, filterEnable: true },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String, sortEnable: true, filterEnable: true },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date, sortEnable: true, filterEnable: true },
      { dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number, sortEnable: true, filterEnable: true },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean, sortEnable: true, filterEnable: true }];

    this.dataService.getAll().subscribe((data: any) => {
      // for client side data pass total is 0, as it will calculate total from length of array.
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }

}
