import { NgModule } from '@angular/core';
import { NpUiDataGridComponent } from './np-ui-data-grid.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NpPagerService } from './services/np-ui-pager.service';
import { NpFilterTypesPipe } from './pipes/np-filter-types.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    NpUiDataGridComponent,
    NpFilterTypesPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DragDropModule
  ],
  exports: [
    NpUiDataGridComponent
  ],
  providers: [
    NpPagerService
  ]
})
export class NpUiDataGridModule { }
