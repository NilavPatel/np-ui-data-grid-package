import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataTypes, DataSource } from 'projects/np-ui-data-grid/src/public-api';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sorting-grid',
  templateUrl: './sorting-grid.component.html'
})
export class SortingGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource>;
  multiColumnSortEnable: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number, sortEnabled: true },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String, sortEnabled: true },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String, sortEnabled: true },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date, sortEnabled: true },
      { dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number, sortEnabled: true },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean, sortEnabled: true }];

    this.gridDataSource = new BehaviorSubject(null);

    this.onLoadData();
  }

  onLoadData() {
    this.dataService.getAll().subscribe((data: any) => {
      // for client side data pass total is 0, as it will calculate total from length of array.
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }
}
