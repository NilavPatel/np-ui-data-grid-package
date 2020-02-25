import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NpFilterService } from './services/np-ui-filter.service';
import { NpUtilityService } from './services/np-ui-utility.service';
import { NpODataService } from './services/np-ui-odata.service';
import { NpPagerService } from './services/np-ui-pager.service';
import { NpFileService } from './services/np-ui-file.service';
import { NpFilterTypesPipe } from './pipes/np-ui-filter-types.pipe';
import { NpUiDataGridComponent } from './np-ui-data-grid.component';

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
    NpUtilityService,
    NpODataService,
    NpFileService
  ]
})
export class NpUiDataGridModule { }
