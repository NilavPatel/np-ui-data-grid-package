import { NgModule } from '@angular/core';
import { NpUiDataGridComponent } from './np-ui-data-grid.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NpPagerService } from './services/np-ui-pager.service';

@NgModule({
  declarations: [
    NpUiDataGridComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  exports: [
    NpUiDataGridComponent
  ],
  providers: [
    NpPagerService
  ]
})
export class NpUiDataGridModule { }
