import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NpColumn } from './models/column.model';
import { NpDataSource, CustomStore } from './models/data-source.model';
import { NpPagerService } from './services/np-ui-pager.service';

@Component({
  selector: 'np-ui-data-grid',
  templateUrl: 'np-ui-data-grid.component.html',
  styleUrls: ['np-ui-data-grid.component.css']
})
export class NpUiDataGridComponent implements OnInit {

  @Input() columns: NpColumn[];
  _columns: NpColumn[];

  @Input() dataSource: NpDataSource;
  _dataSource: NpDataSource;

  /**current view data */
  _currentViewData: any[];

  _pager: any = {};

  /**row id prefix, used in generating unique ids for rows */
  _rowIdPrefix: string = "row_";

  _pageSize: number = 10;

  _total: number;

  // set grid height
  @Input() height: number;

  // set grid width
  @Input() width: number;

  constructor(private pagerService: NpPagerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource != undefined) {
      this._dataSource = this.dataSource;
      this._getCurrentViewData(1);
    }
    if (changes.columns != undefined) {
      this._setColumns();
    }
  }

  _getCurrentViewData(currentPageNumber: number) {
    if (this._dataSource.isServerOperations) {
      this._dataSource.load(currentPageNumber, this._pageSize).then((store: CustomStore) => {
        this._currentViewData = store.data;
        this._total = store.total;
        this._pager = this.pagerService.getPager(this._total, currentPageNumber, this._pageSize);
      }).catch(error => {
        console.error(error);
      });
    } else {
      this._pager = this.pagerService.getPager(this._dataSource.total, currentPageNumber, this._pageSize);
      this._currentViewData = this._dataSource.data.slice(this._pager.startIndex, this._pager.endIndex + 1);
      this._total = this._dataSource.data.length;
    }
  }

  _setColumns() {
    var result = [];
    this.columns.forEach(element => {
      result.push(new NpColumn(element));
    });
    this._columns = result;
    return;
  }

  _onPageSizeChange() {
    this._getCurrentViewData(this._pager.currentPage);
  }

  _onCellClick($event: any, column: NpColumn, data: any) {
    if (column.onCellClick != undefined) {
      column.onCellClick($event, column, data)
    }
  }
}
