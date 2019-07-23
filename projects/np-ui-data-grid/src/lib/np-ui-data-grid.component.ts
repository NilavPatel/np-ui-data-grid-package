import { Component, OnInit, Input, SimpleChanges, TemplateRef, EventEmitter, Output } from '@angular/core';
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

  @Input() isStickyHeader: boolean = false;

  _showLoader: boolean = false;

  @Input() singleSelectEnable: boolean = false;

  @Input() multiSelectEnable: boolean = false;

  _selectedRowKeys: any[] = [];

  @Input() key: string;
  _key: string;

  _isAllSelected: boolean;

  @Output() onRowClick: EventEmitter<any> = new EventEmitter();

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
    if (this.key && this.key != null && this.key.length > 0) {
      this._key = this.key;
    } else {
      this._key = this._columns[0].dataField;
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
        if (this._isAllSelected) {
          var that = this;
          this._currentViewData.forEach(function (element) {
            if (that._selectedRowKeys.indexOf(element[that._key]) == -1) {
              that._selectedRowKeys.push(element[that._key]);
            }
          });
        }
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
    this._selectedRowKeys = [];
    this._isAllSelected = false;
    if (this._dataSource.isServerOperations) {
      this._showLoader = true;
      this._dataSource.load(1, this._pager.pageSize, this._sortColumnList, this._filterColumnList).then((store: CustomStore) => {
        this._showLoader = false;
        this._currentViewData = store.data;
        this._total = store.total;
        this._pager = this.pagerService.getPager(this._total, 1, this._pager.pageSize);
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
    if (!this._dataSource.isServerOperations) {
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
    this._selectedRowKeys = [];
    this._isAllSelected = false;
    if (this._dataSource.isServerOperations) {
      this._showLoader = true;
      this._dataSource.load(1, this._pager.pageSize, this._sortColumnList, this._filterColumnList).then((store: CustomStore) => {
        this._showLoader = false;
        this._currentViewData = store.data;
        this._total = store.total;
        this._pager = this.pagerService.getPager(this._total, 1, this._pager.pageSize);
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

  _openMasterChild(row: any) {
    row.isOpen = !row.isOpen;
  }

  _onSelectAll(event: { currentTarget: { checked: any; }; }) {
    if (this.singleSelectEnable) {
      return;
    }
    if (event.currentTarget.checked) {
      this._selectAll();
    } else {
      this._deSelectAll();
    }
  }

  _deSelectAll() {
    this._selectedRowKeys = [];
  }

  _selectAll() {
    if (this._dataSource.isServerOperations) {
      this._selectedRowKeys = [];
      var that = this;
      this._currentViewData.forEach(function (element) {
        that._selectedRowKeys.push(element[that._key]);
      });
    } else {
      this._selectedRowKeys = [];
      var that = this;
      this._dataSource.data.forEach(function (element) {
        that._selectedRowKeys.push(element[that._key]);
      });
    }
  }

  _onSelectRow(keyValue: any, event: { currentTarget: { checked: any; }; }) {
    if (this.singleSelectEnable) {
      this._selectedRowKeys = [];
      this._selectedRowKeys.push(keyValue);
      return;
    }
    if (event.currentTarget.checked) {
      this._selectedRowKeys.push(keyValue);
    } else {
      _.remove(this._selectedRowKeys, function (n) {
        return n == keyValue
      });
    }
  }

  _isSelected(keyValue: any) {
    return this._selectedRowKeys.indexOf(keyValue) > -1;
  }

  _rowClick = function (event: any, data: any) {
    if (this.onRowClick) {
      event.data = data;
      this.onRowClick.emit(event);
    }
  };

  /**
   * get selected row keys array
   */
  getSelectedRowKeys() {
    return this._selectedRowKeys;
  }

  /**
   * reset all
   */
  reset() {
    this._filterColumnList = [];
    this._sortColumnList = [];
    this._selectedRowKeys = [];
    this._isAllSelected = false;
    if (this._dataSource.isServerOperations) {
      this._getCurrentViewData(1);
    }
    else {
      this._dataSource.data = this.dataSource.data;
      this._getCurrentViewData(1);
    }
  }

  /**
   * select all rows
   */
  selectAll() {
    this._selectAll()
  }

  /**
   * de select all rows
   */
  deSelectAll() {
    this._deSelectAll();
  }

  /**
   * show loader
   */
  showLoader() {
    this._showLoader = true;
  }

  /**
   * hide loader
   */
  hideLoader() {
    this._showLoader = false;
  }

  /**
   * hide column by index
   * @param idx index number of column
   */
  hideColumnByIndex(idx: number) {
    this._columns[idx].visible = false;
  }

  /**
   * show column by index
   * @param idx index number of column
   */
  showColumnByIndex(idx: number) {
    this._columns[idx].visible = true;
  }

  /**
   * hide column by data field
   * @param dataField dataField value of column
   */
  hideColumnByDataField(dataField: string) {
    this._columns.forEach(function (element) {
      if (element.dataField == dataField) {
        element.visible = false;
      }
    });
  }

  /**
   * show column by data field
   * @param dataField dataField value of column
   */
  showColumnByDataField(dataField: string) {
    this._columns.forEach(function (element) {
      if (element.dataField == dataField) {
        element.visible = true;
      }
    });
  }

  /**
   * go to page
   * @param pageNumber page number
   */
  goToPage(pageNumber: number) {
    this._getCurrentViewData(pageNumber);
  }

  /**
   * sort by column
   * @param dataField dataField value of column
   * @param direction desc | asc
   */
  sortByColumn(dataField: string, direction: string) {
    var sortColumn = _.find(this._columns, function (element: NpColumn) { return element.dataField === dataField });
    sortColumn.sortDirection = direction == "desc" ? "desc" : "asc";
    this._onSort(sortColumn);
  }

  /**
   * filter by column 
   * @param dataField dataField value of column
   * @param keyword search keyword
   * @param type startWith | endWith | contains | greaterThan | lessThan | equals | dateLessThan | dateGreaterThan | dateEquals
   */
  filterByColumn(dataField: string, keyword: string, type: string) {
    var filterColumn = _.find(this._columns, function (element: NpColumn) { return element.dataField === dataField });
    filterColumn.filterString = keyword;
    filterColumn.filterType = type;
    this._onFilter(filterColumn, true);
  }
}
