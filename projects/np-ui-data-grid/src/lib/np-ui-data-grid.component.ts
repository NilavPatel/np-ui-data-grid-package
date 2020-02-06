import { Component, OnInit, Input, SimpleChanges, TemplateRef, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Column } from './models/column.model';
import { DataSource, CustomStore } from './models/data-source.model';
import { NpPagerService, Pager } from './services/np-ui-pager.service';
import { Constants, FilterTypes, DataTypes, SortDirections } from './models/constants';
import { State } from './models/state.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'np-ui-data-grid',
  templateUrl: 'np-ui-data-grid.component.html',
  styleUrls: ['np-ui-data-grid.component.css']
})
export class NpUiDataGridComponent implements OnInit, AfterViewInit {

  @Input() columns: Column[];
  _columns: Column[];

  @Input() dataSource: DataSource;
  _dataSource: DataSource;

  /**current view data */
  _currentViewData: any[];

  _pager: Pager;

  _total: number;

  _filtersList: any[];

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

  _openRowKeys: any[] = [];

  @Input() key: string;
  _key: string;

  _isAllSelected: boolean;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  @Output() onDeselect: EventEmitter<any> = new EventEmitter();

  @Output() onRowClick: EventEmitter<any> = new EventEmitter();

  _dataTypes = DataTypes;
  _sortDirections = SortDirections;

  @Input() tableId: string;

  @Input() showColumnChooser: boolean;
  _isOpenColumnChooser: boolean = false;

  _visibleColumnCount: number = 0;

  @Input() title: string = "";

  @Input() enableStateStoring: boolean;

  _stateList: State[];

  _currentStateName: string;

  _isFilterAvailable: boolean;

  @Input() noDataMessage: string = "No Data Found.";

  @Input() showFilters: boolean;

  @Output() onInit: EventEmitter<any> = new EventEmitter();

  @Output() onAfterInit: EventEmitter<any> = new EventEmitter();

  @Input() isShowSummary: boolean;
  @Input() summaryTemplate: TemplateRef<any>;
  _summaryData: any;

  constructor(private pagerService: NpPagerService) {
    this._pager = this.pagerService.getPager(0, 1, 10);
    this._sortColumnList = [];
    this._filtersList = Constants.filters();
    this._filterColumnList = [];
    this._stateList = [];
    this._currentStateName = "";
    this._isFilterAvailable = false;
    this.showFilters = true;
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
    if (this.tableId == undefined) {
      this.tableId = "tbl-" + Math.floor(Math.random() * 6 + 1);
    }
    if (this.onInit != undefined) {
      this.onInit.emit();
    }
  }

  ngAfterViewInit(): void {
    if (this.onAfterInit != undefined) {
      this.onAfterInit.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dataSource != undefined && changes.dataSource.currentValue != undefined) {
      this._dataSource = new DataSource();
      this._dataSource.data = this.dataSource.data;
      this._dataSource.summary = this.dataSource.summary;
      this._dataSource.isServerOperations = this.dataSource.isServerOperations;
      this._dataSource.load = this.dataSource.load;
      this._getCurrentViewData(1);
    }
    if (changes.columns != undefined) {
      this._setColumns();
    }
  }

  _getCurrentViewData(currentPageNumber: number) {
    if (currentPageNumber == 0) {
      currentPageNumber = 1;
    }
    if (this._pager.totalPages > 0 && currentPageNumber > this._pager.totalPages) {
      currentPageNumber = this._pager.totalPages;
    }
    if (this._dataSource.isServerOperations) {
      this._showLoader = true;
      this._dataSource.load(currentPageNumber, this._pager.pageSize, this._sortColumnList, this._filterColumnList).then((store: CustomStore) => {
        this._currentViewData = store.data;
        this._summaryData = store.summary;
        this._total = store.total;
        this._pager = this.pagerService.getPager(this._total, currentPageNumber, this._pager.pageSize);
        if (this._isAllSelected) {
          var that = this;
          that._currentViewData.forEach(function (element) {
            if (that._selectedRowKeys.indexOf(element[that._key]) == -1) {
              that._selectedRowKeys.push(element[that._key]);
            }
          });
        }
        this._showLoader = false;
      }).catch(error => {
        console.error(error);
      });
    } else {
      this._pager = this.pagerService.getPager(this._dataSource.data.length, currentPageNumber, this._pager.pageSize);
      this._currentViewData = this._dataSource.data.slice(this._pager.startIndex, this._pager.endIndex + 1);
      this._total = this._dataSource.data.length;
      this._summaryData = this._dataSource.summary;
    }
  }

  _setColumns() {
    var result = [];
    this.columns.forEach(element => {
      result.push(new Column(element));
    });
    this._columns = result;
    this._setColumnsCount();
    return;
  }

  _setColumnsCount() {
    this._visibleColumnCount = this._custFilter(this._columns, function (element) { if (element.visible == true) { return element } }).length;
    this._isFilterAvailable = this._custFilter(this._columns, function (element) { if (element.filterEnabled == true && element.visible == true) { return element } }).length > 0;
  }

  _onPageSizeChange() {
    this._getCurrentViewData(1);
  }

  _onCellClick($event: any, column: Column, data: any) {
    if (column.onCellClick != undefined) {
      column.onCellClick($event, column, data)
    }
  }

  _onSort(column: Column) {

    if (!column.sortEnabled) {
      return;
    }

    var sortOrder = column.sortDirection == SortDirections.Descending ? SortDirections.Ascending : SortDirections.Descending;
    if (!this.multiColumnSortEnable) {
      this._removeAllSorting();
    }
    column.sortDirection = sortOrder;

    if (this.multiColumnSortEnable) {
      var list = [];
      this._sortColumnList.forEach(function (element) {
        if (element.column !== column.dataField) {
          list.push(element);
        }
      });
      this._sortColumnList = list;
    }
    this._sortColumnList.push({ column: column.dataField, sortDirection: column.sortDirection });
    this._selectedRowKeys = [];
    this._openRowKeys = [];
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
      this._dataSource.data = this._custSort(this._dataSource.data, element.column, element.sortDirection);
    });
  }

  _removeAllSorting() {
    this._columns.forEach(element => {
      element.sortDirection = null;
    });
    this._sortColumnList = [];
  }

  _removeSortingFromColumn(column: Column) {
    column.sortDirection = null;

    var list = [];
    this._sortColumnList.forEach(function (element) {
      if (element.column !== column.dataField) {
        list.push(element);
      }
    });
    this._sortColumnList = list;

    if (!this._dataSource.isServerOperations) {
      this._resetDataSource();
      this._filterDataSource();
      this._sortColumnList.forEach(element => {
        this._dataSource.data = this._custSort(this._dataSource.data, element.column, element.sortDirection);
      });
    }
    this._getCurrentViewData(1);
    return;
  }

  _resetDataSource() {
    this._dataSource.data = this.dataSource.data;
  }

  _onFilter(column: Column, isForceFilter: boolean) {
    if (!isForceFilter && (column.filterValue == undefined || column.filterValue == null || column.filterValue.length == 0
      || column.filterOperator == undefined || column.filterOperator == null)) {
      return;
    }
    this._filterColumnList = [];
    this._columns.forEach(element => {
      if (element.filterOperator != undefined && element.filterOperator != null
        && element.filterValue && element.filterValue.toString().length > 0) {
        this._filterColumnList.push({ column: element.dataField, filterOperator: element.filterOperator, filterValue: element.filterValue, dataType: element.dataType });
      }
    });
    this._selectedRowKeys = [];
    this._openRowKeys = [];
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
    var that = this;
    var data = that.dataSource.data;
    that._filterColumnList.forEach(element => {
      if (element.filterOperator === FilterTypes.StartsWith) {
        data = that._custFilter(data, function (a) {
          return that._custStartWith(a[element.column].toLowerCase(), element.filterValue.toLowerCase());
        });
      } else if (element.filterOperator === FilterTypes.EndsWith) {
        data = that._custFilter(data, function (a) {
          return that._custEndWith(a[element.column].toLowerCase(), element.filterValue.toLowerCase());
        });
      } else if (element.filterOperator === FilterTypes.Contains) {
        data = that._custFilter(data, function (a) {
          return a[element.column].toLowerCase().indexOf(element.filterValue.toLowerCase()) !== -1;
        });
      } else if (element.filterOperator === FilterTypes.GreaterThan) {
        if (element.dataType === DataTypes.Number) {
          data = that._custFilter(data, function (a) {
            return a[element.column] > parseInt(element.filterValue);
          });
        } else if (element.dataType === DataTypes.Date) {
          data = that._custFilter(data, function (a) {
            return a[element.column].setHours(0, 0, 0, 0) > new Date(element.filterValue).setHours(0, 0, 0, 0);
          });
        }
      } else if (element.filterOperator === FilterTypes.LessThan) {
        if (element.dataType === DataTypes.Number) {
          data = that._custFilter(data, function (a) {
            return a[element.column] < parseInt(element.filterValue);
          });
        } else if (element.dataType === DataTypes.Date) {
          data = that._custFilter(data, function (a) {
            return a[element.column].setHours(0, 0, 0, 0) < new Date(element.filterValue).setHours(0, 0, 0, 0);
          });
        }
      } else if (element.filterOperator === FilterTypes.Equals) {
        if (element.dataType === DataTypes.Boolean) {
          if (element.filterValue === "true") {
            data = that._custFilter(data, function (a) {
              return a[element.column] === true;
            });
          } else {
            data = that._custFilter(data, function (a) {
              return a[element.column] === false;
            });
          }
        } else if (element.dataType === DataTypes.Number) {
          data = that._custFilter(data, function (a) {
            return a[element.column] === parseInt(element.filterValue);
          });
        } else if (element.dataType === DataTypes.Date) {
          data = that._custFilter(data, function (a) {
            return a[element.column].setHours(0, 0, 0, 0) === new Date(element.filterValue).setHours(0, 0, 0, 0);
          });
        }
      } else if (element.filterOperator === FilterTypes.NotEquals) {
        if (element.dataType === DataTypes.Boolean) {
          if (element.filterValue === "true") {
            data = that._custFilter(data, function (a) {
              return a[element.column] !== true;
            });
          } else {
            data = that._custFilter(data, function (a) {
              return a[element.column] !== false;
            });
          }
        } else if (element.dataType === DataTypes.Number) {
          data = that._custFilter(data, function (a) {
            return a[element.column] !== parseInt(element.filterValue);
          });
        } else if (element.dataType === DataTypes.Date) {
          data = that._custFilter(data, function (a) {
            return a[element.column].setHours(0, 0, 0, 0) !== new Date(element.filterValue).setHours(0, 0, 0, 0);
          });
        }
      }
    });
    that._dataSource.data = data;
    that._total = data.length;
  }

  _removeFilterStringFromColumn(column: Column) {
    column.filterValue = undefined;
    column.filterOperator = undefined;
    this._onFilter(column, true);
  }

  _openMasterChild(keyValue: any) {
    var idx = this._openRowKeys.indexOf(keyValue);
    if (idx == -1) {
      this._openRowKeys.push(keyValue)
    } else {
      var list = [];
      this._openRowKeys.forEach(function (element) {
        if (element != keyValue) {
          list.push(element);
        }
      });
      this._openRowKeys = list;
    }
  }

  _onSelectAll(event: any) {
    if (this.singleSelectEnable) {
      return;
    }
    if (event.currentTarget.checked) {
      this._selectAll();
      if (this.onSelect != undefined) {
        event.data = this._selectedRowKeys;
        this.onSelect.emit(event);
      }
    } else {
      var deselectedRowKeys = this._selectedRowKeys;
      this._deSelectAll();
      if (this.onDeselect != undefined) {
        event.data = deselectedRowKeys;
        this.onDeselect.emit(event);
      }
    }
  }

  _deSelectAll() {
    this._selectedRowKeys = [];
  }

  _selectAll() {
    var that = this;
    if (that._dataSource.isServerOperations) {
      that._selectedRowKeys = [];
      that._currentViewData.forEach(function (element) {
        that._selectedRowKeys.push(element[that._key]);
      });
    } else {
      that._selectedRowKeys = [];
      that._dataSource.data.forEach(function (element) {
        that._selectedRowKeys.push(element[that._key]);
      });
    }
  }

  _onSelectRow(keyValue: any, event: any) {
    if (this.singleSelectEnable) {
      this._selectedRowKeys = [];
      if (event.currentTarget.checked) {
        this._selectedRowKeys.push(keyValue);
      }
    } else {
      if (event.currentTarget.checked) {
        this._selectedRowKeys.push(keyValue);
      } else {

        var list = [];
        this._selectedRowKeys.forEach(function (element) {
          if (element != keyValue) {
            list.push(element);
          }
        });
        this._selectedRowKeys = list;
      }
    }
    if (event.currentTarget.checked) {
      if (this.onSelect != undefined) {
        event.data = keyValue;
        this.onSelect.emit(event);
      }
    } else {
      this._isAllSelected = false;
      if (this.onDeselect != undefined) {
        event.data = keyValue;
        this.onDeselect.emit(event);
      }
    }
  }

  _isSelected(keyValue: any) {
    return this._selectedRowKeys.indexOf(keyValue) > -1;
  }

  _isOpen(keyValue: any) {
    return this._openRowKeys.indexOf(keyValue) > -1;
  }

  _rowClick = function (event: any, data: any) {
    if (this.onRowClick) {
      event.data = data;
      this.onRowClick.emit(event);
    }
  };

  _onColumnChoosing(col: Column) {
    col.visible = !col.visible;
    this._setColumnsCount();
  }

  _toggleColumnChooser() {
    this._isOpenColumnChooser = !this._isOpenColumnChooser;
  }

  _drop(event: CdkDragDrop<string[]>) {
    this.showLoader();
    moveItemInArray(this._columns, event.previousIndex, event.currentIndex);
    this.hideLoader();
  }

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
    this._setColumns();
    this._filterColumnList = [];
    this._sortColumnList = [];
    this._selectedRowKeys = [];
    this._openRowKeys = [];
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
    this._setColumnsCount();
  }

  /**
   * show column by index
   * @param idx index number of column
   */
  showColumnByIndex(idx: number) {
    this._columns[idx].visible = true;
    this._setColumnsCount();
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
    this._setColumnsCount();
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
    this._setColumnsCount();
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
  sortByColumn(dataField: string, direction: SortDirections) {
    var sortColumn = this._custFind(this._columns, function (element: Column) { return element.dataField === dataField });
    sortColumn.sortDirection = direction;
    this._onSort(sortColumn);
  }

  /**
   * filter by column 
   * @param dataField dataField value of column
   * @param keyword search keyword
   * @param type FilterTypes
   */
  filterByColumn(dataField: string, keyword: string, type: FilterTypes) {
    var filterColumn = this._custFind(this._columns, function (element: Column) { return element.dataField === dataField });
    filterColumn.filterString = keyword;
    filterColumn.filterType = type;
    this._onFilter(filterColumn, true);
  }

  /**
   * get total row count
   */
  getTotalRows() {
    return this._pager.totalItems;
  }

  /**
   * get current page number
   */
  getCurrentPageNumber() {
    return this._pager.currentPage;
  }

  /**
   * get page size
   */
  getPageSize() {
    return this._pager.pageSize;
  }

  /**
   * get total pages number
   */
  getTotalPages() {
    return this._pager.totalPages;
  }

  /**
   * close all childs
   */
  closeAllChild() {
    this._openRowKeys = [];
  }

  /**
   * get filter column list
   */
  getFilterColumns() {
    return this._filterColumnList;
  }

  /**
   * get sort column list
   */
  getSortColumns() {
    return this._sortColumnList;
  }

  /**
   * get column list
   */
  getColumns() {
    return this._getColumnsArray();
  }

  /**
   * set column list
   * @param columns 
   */
  setColumns(columns: Column[]) {
    this._columns = columns;
    this._filterColumnList = [];
    this._columns.forEach(element => {
      if (element.filterOperator != undefined && element.filterOperator != null
        && element.filterValue && element.filterValue.toString().length > 0) {
        this._filterColumnList.push({ column: element.dataField, filterOperator: element.filterOperator, filterValue: element.filterValue, dataType: element.dataType });
      }
    });
    this._sortColumnList = [];
    this._columns.forEach(element => {
      if (element.sortEnabled && element.sortDirection != null) {
        this._sortColumnList.push({ column: element.dataField, sortDirection: element.sortDirection });
      }
    });
    if (!this._dataSource.isServerOperations) {
      this._filterDataSource();
      this._sortDataSource();
    }
    this._getCurrentViewData(1);
    this._setColumnsCount();
    this, this._selectedRowKeys = [];
    this._openRowKeys = [];
  }

  _saveState() {
    var columns = this._getColumnsArray();
    var currentStateName = this._currentStateName;
    this._stateList.forEach(function (element) {
      if (element.name == currentStateName) {
        element.columns = columns;
        alert("Saved successfully.");
      }
    });
  }

  _addState() {
    var name = prompt("Please enter name", "");
    if (name != undefined && name.length > 0) {
      var columns = this._getColumnsArray();
      this._stateList.push(new State(name, columns));
      this._currentStateName = name;
    }
    if (name != undefined && name.length == 0) {
      alert("Name is required.");
    }
  }

  _deleteState() {
    var currentStateName = this._currentStateName;

    var list = [];
    this._stateList.forEach(function (element) {
      if (element.name != currentStateName) {
        list.push(element);
      }
    });
    this._stateList = list;

    if (this._stateList.length > 0) {
      this._currentStateName = this._stateList[0].name;
    } else {
      this._currentStateName = "";
    }
    this._loadState();
  }

  _loadState() {
    var that = this;
    var currentStateName = that._currentStateName;
    if (currentStateName == "") {
      that.reset();
    }
    this._stateList.forEach(function (element) {
      if (element.name == currentStateName) {
        var columns = [];
        element.columns.forEach(function (col) {
          columns.push(new Column(col));
        });
        that.setColumns(columns);
      }
    });
  }

  private _getColumnsArray() {
    var result = [];
    this._columns.forEach(function (element) {
      result.push(new Column(element));
    });
    return result;
  }

  /**
   * get state list
   */
  getAllState() {
    return this._stateList;
  }

  /**
   * set state list
   * @param states state array
   */
  setAllState(states: State[]) {
    this._stateList = states;
  }

  /**
   * refresh current view data only
   */
  refresh() {
    this._onRefresh();
  }

  _onRefresh() {
    this._getCurrentViewData(this._pager.currentPage);
  }

  _onResetColumn() {
    this.reset();
  }

  private _custFilter(arr: any[], fun: any) {
    return arr.filter(fun);
  }

  private _custFind(arr: any[], fun: any): any {
    return arr.find(fun);
  }

  private _custStartWith(value: string, searchVal: string) {
    return value.startsWith(searchVal, 0)
  }

  private _custEndWith(value: string, searchVal: string) {
    return value.endsWith(searchVal)
  }

  private _custSort(arr: any[], ele: string, order: string) {
    if (order == SortDirections.Descending) {
      return arr.concat().sort(this._sortByDesc(ele));
    } else {
      return arr.concat().sort(this._sortBy(ele));
    }
  }

  private _sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
  };

  private _sortByDesc = (key) => {
    return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
  };
}
