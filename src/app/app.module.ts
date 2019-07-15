import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NpUiDataGridModule } from 'projects/np-ui-data-grid/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NpUiDataGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
