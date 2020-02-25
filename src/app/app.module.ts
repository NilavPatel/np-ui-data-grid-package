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

@NgModule({
  declarations: [
    AppComponent,
    ClientGridComponent,
    ServerGridComponent,
    SortingGridComponent,
    SortingGridComponent
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
