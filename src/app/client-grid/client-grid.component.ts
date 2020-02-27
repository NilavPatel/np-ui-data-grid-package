import { Component, OnInit } from '@angular/core';
import { DataSource, DataTypes, Column } from 'projects/np-ui-data-grid/src/public-api';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-client-grid',
  templateUrl: './client-grid.component.html'
})
export class ClientGridComponent implements OnInit {

  gridColumns: any[];
  gridDataSource: BehaviorSubject<DataSource> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.gridColumns = [
      new Column({ dataField: "Id", visible: true, caption: "Id", dataType: DataTypes.Number }),
      new Column({ dataField: "FirstName", visible: true, caption: "First Name", dataType: DataTypes.String }),
      new Column({ dataField: "LastName", visible: true, caption: "Last Name", dataType: DataTypes.String }),
      new Column({ dataField: "BirthDate", visible: true, caption: "Birth Date", dataType: DataTypes.Date }),
      new Column({ dataField: "Age", visible: true, caption: "Age", dataType: DataTypes.Number }),
      new Column({ dataField: "Active", visible: true, caption: "Is Active?", dataType: DataTypes.Boolean })];

    this.dataService.getAll().subscribe((data: any) => {
      // for client side pass total as 0, as it will calculate total from length of array.
      var dataSource = new DataSource(data, 0, { totalCount: 100000 });
      this.gridDataSource.next(dataSource);
    });
  }
}
