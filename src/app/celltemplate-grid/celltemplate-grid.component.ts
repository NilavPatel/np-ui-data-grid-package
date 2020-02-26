import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataSource, DataTypes } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';

@Component({
  selector: 'app-celltemplate-grid',
  templateUrl: './celltemplate-grid.component.html',
  styleUrls: ['./celltemplate-grid.component.css']
})
export class CelltemplateGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource> = new BehaviorSubject(null);

  @ViewChild("actionButtonsTemplate", { static: true }) actionButtonsTemplate: TemplateRef<any>;
  @ViewChild("birthDateColumnTemplate", { static: true }) birthDateColumnTemplate: TemplateRef<any>;
  @ViewChild("activeColumnTemplate", { static: true }) activeColumnTemplate: TemplateRef<any>;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.gridColumns = [
      { dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number },
      { dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String },
      { dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String },
      { dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date, cellTemplate: this.birthDateColumnTemplate },
      { dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number },
      { dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean, cellTemplate: this.activeColumnTemplate },
      { visible: true, cellTemplate: this.actionButtonsTemplate }];

    this.dataService.getAll().subscribe((data: any) => {
      // for client side data pass total is 0, as it will calculate total from length of array.
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }

}
