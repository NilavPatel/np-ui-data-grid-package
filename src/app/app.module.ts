import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NpUiDataGridModule } from 'projects/np-ui-data-grid/src/public-api';
import { fakeBackendProvider } from './FakeBackendInterceptor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
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
