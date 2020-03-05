import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataSource, DataTypes, Column } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';

@Component({
  selector: 'app-celltemplate-grid',
  templateUrl: './celltemplate-grid.component.html'
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
      new Column({ dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number, sortEnable: true, filterEnable: true }),
      new Column({ dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String, sortEnable: true, filterEnable: true }),
      new Column({ dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String, sortEnable: true, filterEnable: true }),
      new Column({ dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date, sortEnable: true, filterEnable: true, cellTemplate: this.birthDateColumnTemplate }),
      new Column({ dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number, sortEnable: true, filterEnable: true }),
      new Column({ dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean, sortEnable: true, filterEnable: true, cellTemplate: this.activeColumnTemplate }),
      new Column({ visible: true, cellTemplate: this.actionButtonsTemplate })];

    this.dataService.getAll().subscribe((data: any) => {
      
      var dataSource = new DataSource(data, 0, { totalCount: 10000 });
      this.gridDataSource.next(dataSource);
    });
  }

  onActionClick(row, actionType, event){
    alert("Action type is : "+ actionType + ", Row key value:" + row["Id"])
  }

}
