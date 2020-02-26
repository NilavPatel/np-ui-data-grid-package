import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataSource, DataTypes, LoadOptions } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-server-grid',
  templateUrl: './server-grid.component.html'
})
export class ServerGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource> = new BehaviorSubject(null);
  currentLoadOptions: LoadOptions;

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
  }

  onLoadData(options: LoadOptions) {
    this.currentLoadOptions = options;
    this.dataService.getDataUsingLoadOptions(options).subscribe((data: any) => {
      var result = new DataSource(data.data, data.total, { totalCount: 1000 }, options.isAllPages);
      this.gridDataSource.next(result);
    });
  }
}
