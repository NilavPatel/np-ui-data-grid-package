import { NgModule } from '@angular/core';
import { NpUiDataGridComponent } from './np-ui-data-grid.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NpPagerService } from './services/np-ui-pager.service';
import { NpFilterTypesPipe } from './pipes/np-ui-filter-types.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NpFilterService } from './services/np-ui-filter.service';
import { NpUtilityService } from './services/np-ui-utility';

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
    NpPagerService,
    NpFilterService,
    NpUtilityService
  ]
})
export class NpUiDataGridModule { }
