import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataTypes, DataSource, LoadOptions } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';

@Component({
  selector: 'app-filter-grid',
  templateUrl: './filter-grid.component.html'
})
export class FilterGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource>;
  serverGridDataSource: BehaviorSubject<DataSource>;
  showFilters: boolean = true;
  currentLoadOptions: LoadOptions;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number, filterEnable: true },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String, filterEnable: true },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String, filterEnable: true },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date, filterEnable: true },
      { dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number, filterEnable: true },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean, filterEnable: true }];

    this.gridDataSource = new BehaviorSubject(null);
    this.serverGridDataSource = new BehaviorSubject(null);

    this.onLoadData();
  }

  onLoadData() {
    this.dataService.getAll().subscribe((data: any) => {
      // for client side data pass total is 0, as it will calculate total from length of array.
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }

  onLoadDataServerGrid(options: LoadOptions) {
    this.currentLoadOptions = options;
    this.dataService.getDataUsingLoadOptions(options).subscribe((data: any) => {
      var result = new DataSource(data.data, data.total, { totalCount: 1000 }, options.isAllPages);
      this.serverGridDataSource.next(result);
    });
  }
}
