import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NpUiDataGridModule } from 'projects/np-ui-data-grid/src/public-api';
import { fakeBackendProvider } from './FakeBackendInterceptor';
import { HttpClientModule } from '@angular/common/http';
import { ClientGridComponent } from './client-grid/client-grid.component';
import { ServerGridComponent } from './server-grid/server-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientGridComponent,
    ServerGridComponent
  ],
  imports: [
    BrowserModule,
    NpUiDataGridModule,
    HttpClientModule
  ],
  providers: [    
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
