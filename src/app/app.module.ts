import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NpUiDataGridModule } from 'projects/np-ui-data-grid/src/public-api';
import { fakeBackendProvider } from './FakeBackendInterceptor';
import { HttpClientModule } from '@angular/common/http';
import { ClientGridComponent } from './client-grid/client-grid.component';
import { ServerGridComponent } from './server-grid/server-grid.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { SortingGridComponent } from './sorting-grid/sorting-grid.component';
import { FilterGridComponent } from './filter-grid/filter-grid.component';
import { CelltemplateGridComponent } from './celltemplate-grid/celltemplate-grid.component';
import { ToolbarGridComponent } from './toolbar-grid/toolbar-grid.component';
import { ColumnsGridComponent } from './columns-grid/columns-grid.component';
import { RowSelectGridComponent } from './row-select-grid/row-select-grid.component';
import { MasterChildGridComponent } from './master-detail-grid/master-detail-grid.component';
import { SummaryGridComponent } from './summary-grid/summary-grid.component';
import { StateManagementGridComponent } from './state-management-grid/state-management-grid.component';
import { OtherGridComponent } from './other-grid/other-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientGridComponent,
    ServerGridComponent,
    SortingGridComponent,
    SortingGridComponent,
    FilterGridComponent,
    CelltemplateGridComponent,
    ToolbarGridComponent,
    ColumnsGridComponent,
    RowSelectGridComponent,
    MasterChildGridComponent,
    SummaryGridComponent,
    StateManagementGridComponent,
    OtherGridComponent
  ],
  imports: [
    BrowserModule,
    NpUiDataGridModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
