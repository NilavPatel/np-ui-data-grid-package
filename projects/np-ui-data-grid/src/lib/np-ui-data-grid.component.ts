import { Component, OnInit, Input, SimpleChanges, TemplateRef } from '@angular/core';
import { NpColumn } from './models/column.model';
import { NpDataSource, CustomStore } from './models/data-source.model';
import { NpPagerService, Pager } from './services/np-ui-pager.service';
import * as _ from 'lodash';
import { NpConstants } from './models/constants';

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

  _pager: Pager;

  /**row id prefix, used in generating unique ids for rows */
  _rowIdPrefix: string = "row_";

  _total: number;

  _filterTypes: any[];

  // set grid height
  @Input() height: number;
  // set grid width
  @Input() width: number;

  @Input() multiColumnSortEnable: boolean;
  _sortColumnList: any[];

  _filterColumnList: any[];

  _enableMasterChild: boolean = false;
  @Input() masterChildTemplate: TemplateRef<any>;

  @Input() singleSelectEnable: boolean = false;

  @Input() multiSelectEnable: boolean = false;

  @Input() isStickyHeader: boolean = false;

  _showLoader: boolean = false;

  constructor(private pagerService: NpPagerService) {
    this._pager = this.pagerService.getPager(0, 1, 10);
    this._sortColumnList = [];
    this._filterTypes = NpConstants.filterTypes();
    this._filterColumnList = [];
  }

  ngOnInit() {
    if (this.masterChildTemplate != undefined && this.masterChildTemplate != null) {
      this._enableMasterChild = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource.currentValue != undefined) {
      this._dataSource = new NpDataSource();
      this._dataSource.data = this.dataSource.data;
      this._dataSource.isServerOperations = this.dataSource.isServerOperations;
      this._dataSource.load = this.dataSource.load;
      this._getCurrentViewData(1);
    }
    if (changes.columns != undefined) {
      this._setColumns();
    }
  }

  _getCurrentViewData(currentPageNumber: number) {
    if (this._dataSource.isServerOperations) {
      this._pager = this.pagerService.getPager(this._total, currentPageNumber, this._pager.pageSize);
      this._showLoader = true;
      this._dataSource.load(this._pager.currentPage, this._pager.pageSize, this._sortColumnList, this._filterColumnList).then((store: CustomStore) => {
        this._showLoader = false;
        this._currentViewData = store.data;
        this._total = store.total;
      }).catch(error => {
        console.error(error);
      });
    } else {
      this._pager = this.pagerService.getPager(this._dataSource.data.length, currentPageNumber, this._pager.pageSize);
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
    this._getCurrentViewData(1);
  }

  _onCellClick($event: any, column: NpColumn, data: any) {
    if (column.onCellClick != undefined) {
      column.onCellClick($event, column, data)
    }
  }

  _onSort(column: NpColumn) {
    if (!column.sortEnabled) {
      return;
    }

    var sortOrder = column.sortDirection && column.sortDirection === 'asc' ? 'desc' : 'asc';
    if (!this.multiColumnSortEnable) {
      this._removeAllSorting();
    }
    column.sortDirection = sortOrder;

    if (this.multiColumnSortEnable) {
      _.remove(this._sortColumnList, function (element) {
        return element.column === column.dataField;
      });
    }
    this._sortColumnList.push({ column: column.dataField, sortDirection: column.sortDirection });

    if (this.dataSource.isServerOperations) {
      this.dataSource.load(1, this._pager.pageSize, this._sortColumnList, this._filterColumnList).then((store: CustomStore) => {
        this._currentViewData = store.data;
        this._total = store.total;
        this._pager = this.pagerService.getPager(this._total, this._pager.currentPage, this._pager.pageSize);
      }).catch(error => {
        console.error(error);
      });
    } else {
      this._sortDataSource();
      this._getCurrentViewData(1);
    }
  }

  _sortDataSource() {
    this._sortColumnList.forEach(element => {
      this._dataSource.data = _.orderBy(this._dataSource.data, element.column, element.sortDirection === 'asc' ? 'asc' : 'desc');
    });
  }

  _removeAllSorting() {
    this._columns.forEach(element => {
      element.sortDirection = null;
    });
    this._sortColumnList = [];
  }

  _removeSortingFromColumn(column: NpColumn) {
    column.sortDirection = null;
    _.remove(this._sortColumnList, function (element) { return element.column === column.dataField });
    if (!this.dataSource.isServerOperations) {
      this._resetDataSource();
      this._filterDataSource();
      this._sortColumnList.forEach(element => {
        this._dataSource.data = _.orderBy(this._dataSource.data, element.column, element.sortDirection === 'asc' ? 'asc' : 'desc');
      });
    }
    this._getCurrentViewData(1);
    return;
  }

  _resetDataSource() {
    this._dataSource.data = this.dataSource.data;
  }

  _onFilter(column: NpColumn, isForceFilter: boolean) {
    if (!isForceFilter && (column.filterString == undefined || column.filterString == null || column.filterString.length == 0
      || column.filterType == undefined || column.filterType == null || column.filterType.length == 0)) {
      return;
    }
    this._filterColumnList = [];
    this._columns.forEach(element => {
      if (element.filterType && element.filterType.length > 0 && element.filterString && element.filterString.toString().length > 0) {
        this._filterColumnList.push({ column: element.dataField, filterString: element.filterString, filterType: element.filterType, dataType: element.dataType });
      }
    });
    if (this.dataSource.isServerOperations) {
      this.dataSource.load(1, this._pager.pageSize, this._sortColumnList, this._filterColumnList).then((store: CustomStore) => {
        this._currentViewData = store.data;
        this._total = store.total;
        this._pager = this.pagerService.getPager(this._total, this._pager.currentPage, this._pager.pageSize);
      }).catch(error => {
        console.error(error);
      });
    } else {
      this._filterDataSource();
      this._sortDataSource();
      this._getCurrentViewData(1);
    }
  }

  _filterDataSource() {
    var data = this.dataSource.data;
    this._filterColumnList.forEach(element => {
      if (element.filterType == "startWith") {
        data = _.filter(data, function (a) {
          return _.startsWith(a[element.column].toLowerCase(), element.filterString.toLowerCase());
        });
      } else if (element.filterType == "endWith") {
        data = _.filter(data, function (a) {
          return _.endsWith(a[element.column].toLowerCase(), element.filterString.toLowerCase());
        });
      } else if (element.filterType == "contains") {
        data = _.filter(data, function (a) {
          return a[element.column].toLowerCase().indexOf(element.filterString.toLowerCase()) !== -1;
        });
      } else if (element.filterType == "greaterThan") {
        data = _.filter(data, function (a) {
          return a[element.column] > parseInt(element.filterString);
        });
      } else if (element.filterType == "lessThan") {
        data = _.filter(data, function (a) {
          return a[element.column] < parseInt(element.filterString);
        });
      } else if (element.filterType == "equals") {
        if (element.dataType == "boolean") {
          if (element.filterString == "true") {
            data = _.filter(data, function (a) {
              return a[element.column] == true;
            });
          } else {
            data = _.filter(data, function (a) {
              return a[element.column] == false;
            });
          }
        } else {
          data = _.filter(data, function (a) {
            return a[element.column] === parseInt(element.filterString);
          });
        }
      } else if (element.filterType == "dateLessThan") {
        data = _.filter(data, function (a) {
          return a[element.column] < new Date(element.filterString);
        });
      } else if (element.filterType == "dateGreaterThan") {
        data = _.filter(data, function (a) {
          return a[element.column] > new Date(element.filterString);
        });
      } else if (element.filterType == "dateEquals") {
        data = _.filter(data, function (a) {
          return a[element.column] == new Date(element.filterString);
        });
      } else {
        data = _.filter(data, function (a) { return a[element.column] == element.filterString });
      }
    });
    this._dataSource.data = data;
    this._total = data.length;
  }

  _removeFilterStringFromColumn(column: NpColumn) {
    column.filterString = null;
    column.filterType = null;
    this._onFilter(column, true);
  }

  _openMasterChild(row) {
    row.isOpen = !row.isOpen;
  }

  showLoader() {
    this._showLoader = true;
  }

  hideLoader() {
    this._showLoader = false;
  }

}
