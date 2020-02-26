# np-ui-data-grid
Data grid custom component for Angular 9 and 9+, Created using only Angular.
## Check demo [Here](https://stackblitz.com/edit/np-ui-data-grid)
## NPM
`$ npm i np-ui-data-grid`

## Features
* Maximum row handling capacity is upto 10,00,000 in client side mode
* Client/Server side Paging
* Client/Server side Filtering
* Client/Server side Sorting
* Single and Multiple row selection
* Master-Detail row section
* Get/Set Column configurations
* Store state of grid and change from dropdown  
(show/hide column, filters values and sorting is also saved in state).
* Column drag and drop.
* Summary in datagrid footer.
* Resize columns width
* OData support for server side

## HTML
````html
<np-ui-data-grid 
    [columns]="gridColumns" 
    [dataSource]="gridDataSource" 
    [multiColumnSortEnable]=true
    [masterDetailTemplate]="masterDetailTemplate" 
    [height]="400" 
    [width]="1000" 
    [isStickyHeader]="true"
    [multiRowSelectEnable]="true">
</np-ui-data-grid>
````

## Properties
1.  `[columns]`  
    Example:
    ````javascript
    [
        { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: DataTypes.Number, sortEnable: true, filterEnable: true, onCellClick: this.cellClicked },
        { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: DataTypes.String, sortEnable: true, filterEnable: true }
    ]
    ````    
    1.1 `dataType` property is for setting type of data. use **DataTypes** to get possible values.  
    ( data types are string, number, boolean, date)  
    1.2 `dataField` is name of the property from datasource array. Needs to be same as it retrived in data source.  
    1.3 `caption` is for setting column header, if not set then "dataField" will be displayed as caption.  
    1.4 Set `sortEnable` and `filterEnable` on column basis (default false)  
    1.5 `cellTemplate` : TemplateRef<any>, pass template to grid column, row data will be bind as let-row="row".  
    1.6 `onCellClick` bind on cell click event, in argument column data is passed for which column is clicked.  
    1.7 `rightAlignText` : boolean , to make text right aligned.  
    1.8 Filter event will fired on change event of filter input/filter type.  
  
2.  `[dataSource]`  : BehaviorSubject<DataSource>
    Where **DataSource** has below properties:  
    `data` : any[] => Array of data  
    `total` : number => Count of total records. (Only need to pass for server oprations)  
    `summary` : any => summary data object of any type  
    After data load, pass object of DataSource to this observable using .next() method.
    
3.  `[isServerOperations]` : boolean => Set server opration true or false. Default value is false.    
    
4.  `[multiColumnSortEnable]`  
    if set to true then multiple columns can be sorted. Need to set sortEnable = true in column too.  
    Default table is working on single column sort.  
  
5.  `[height]`: number  
    add number to set height of data grid in px (default height is auto)  
  
6.  `[width]`: number  
    add number to set width of data grid in px (default width is auto)  
  
7.  `[key]`: string  
    give primary column dataField as key. (default first column will be taken as key).  
  
8.  `[tableId]`: string  
    set html attribute id to component  
  
9.  `[multiRowSelectEnable]` : boolean OR `[singleRowSelectEnable]` : boolean  
    Will show checkboxes in first column to select single/multiple rows.  
      
10.  `[masterDetailTemplate]` : TemplateRef<any>  
    Pass TemplateRef<any> type object to above attribute to dispay master child grid.  
    if masterDetailTemplate is passed then +, - icons will be displayed to open/close child view.  
      
11. `[isStickyHeader]` : boolean  
    If true then header will stick on top when scroll grid vertically.  
      
12. `[showColumnChooser]` : boolean  
    want to show button for column chooser or not.  
    if set to true then on top of the data grid one button is avalable,  
    where list of columns will be shown with Check boxes.  
    On selecting check boxes columns will be show/hide.  
    Column drag and drop is also given inside column chooser.  
      
13. `[title]` : string  
    give title to datagrid  
    type is string.  
      
14. `[enableStateStoring]` : boolean  
    enable state storing or not, default is false.  
    if state storing is enabled then only controls are visible for state storing.  
      
15. `[noDataMessage]` : string  
    Message will be displayed if no data found for data grid.  
    Default value is "No Data Found."  
      
16. `[showFilters]` : boolean  
    default value of show filters is true, this is only used to show/hide row of filters.  
    If any visible column is defined with filterEnable true then filters will be shown for that column,  
    but using this showFilter property you can show/hide whole row of filters.  
      
17. `[showSummary]`  
    default value is false. To show/hide summary at footer of datagrid.  
  
18. `[summaryTemplate]` : TemplateRef<any>  
    Template reference for summary at footer of datagrid.  
    **CLIENT SIDE**  
    To show summary in client side pass summary variable in DataSource.summary.  
    Which data is accessible in template context.   
    **SERVER SIDE**  
    To show summary in client side pass summary variable in CustomStore.summary.  
    Which data is accessible in template context.  
      
19. `[allowColumnReorder]`: boolean
    Set allow columns reorder or not
      
20. `[allowColumnResize]`: boolean
    Set allow columns resize or not

21. `[isODataOperations]` : boolean
    Default value is false, if this option is set to true, then in **onLoadData** argument odataQuery is passed.  
    Which will be used in fetching data using OData.

22. `[allowExportToCSV]` : boolean  
    Default value is false, if this option is set to true, then in toolbar button is visible with CSV file icon,  
    On clicking this button it will download file with all data in .csv format.
    For Client side => all data is available in file.
    For Server side => it will call to onLoadData to retrive all data, and then download file with all data.

23. `[showToolBar]` : boolean  
    Default value is false, if this option is set to true, then toolbar will be visible. This property must be set true to utilize export to CSV, show/hide filters button, column chooser, and state management.
      

## Apis
1.  `goToPage(pageNumber: number)`  
    set page given in argument as current page  
      
2.  `getSelectedRowKeys()`  
    get selected rows  
      
3.  `reset()`  
    reset data grid (remove sorting, filtering, selection)  
      
4.  `sortByColumn(dataField: string, direction: SortDirections)`  
    sort by column and direction  
      
5.  `filterByColumn(dataField: string, keyword: string, type: FilterTypes)`  
    filter by column name and keyword. Keyword will be based on datatype of column.  
      
6.  `selectAll()`  
    select all rows  
      
7.  `deSelectAll()`  
    deselect all rows  
      
8.  `showLoader()`  
    show loader icon into grid UI  
      
9.  `hideLoader()`  
    hide loader icon from grid UI  
      
10. `showColumnByIndex(idx: number)`  
    show column by index value. Start with index 0.  
      
11. `hideColumnByIndex(idx: number)`  
    hide column by index value. Start with index 0.  
      
12. `hideColumnByDataField(dataField: string)`  
    show column by field value  
      
13. `showColumnByDataField(dataField: string)`  
    hide column by field value  
      
14. `getTotalRows()`  
    returns total rows count.  
      
15. `getCurrentPageNumber()`  
    returns current page number.  
      
16. `getPageSize()`  
    returns page size.  
      
17. `getTotalPages()`  
    returns number of total pages in grid  
      
18. `closeAllChild()`  
    close all open childs  
      
19. `getFilterColumns()`  
    get filter columns list  
      
20. `getSortColumns()`  
    get sort columns list  
21. `getColumns()`  
    get columns list with current configurations  
      
22. `setColumns(columns: Column[])`  
    set columns configurations to data grid.  
      
23. `getAllState()`  
    get all state data which stored in data grid  
     
24. `setAllState(states: State[])`  
    set list of state to data grid.  
    parameter is array of State object.  
      
25. `refresh()`  
    refresh current view data only.  
      
26. `removeAllFilters()`  
    remove all filters from grid all columns.  
     
27. `removeAllSortings()`  
    remove all sortings from grid all columns.  

## Methods  
1.  `onRowClick(event)`  
    bind on row click event.  
    event.data contains the data of clicked row.  
      
2.  `onSelect(event)`  
    bind on row select event  
    fires when user select any row/ select all rows.  
    event.data contains the selected row key/keys.  
      
3.  `onDeselect(event)`  
    bind on row de-select event  
    fires when user de select any row or deselect all rows.  
    event.data contains the de selected row key/keys  
      
4.  `onInit()`  
    event fired at view initialization start.  
      
5.  `onAfterInit()`  
    event fired after view initialize.  
      
6.  `onLoadData(optaions : loadOptions)` 
    This function has parameters like `pageNumber`, `pageSize`, `sortColumns`, `filterColumns`.  
    Where `sortColumns` is an array of {dataField : string, sortDirection: string}.  
        possible values for sortDirection are asc, desc.  
    Where `filterColumns` is an array of  
    ````javascript
    { dataField : string, filterOperator: string, filterValue: string, dataType: string}
    ````
    possible values for **filterOperator** are startswith, endswith, contains, gt, lt, ge, le, eq, ne.  
    possible values for **dataType** are number, string, date, boolean.  
  
## Other np-ui components for Angular
1. [Data grid](https://www.npmjs.com/package/np-ui-data-grid)
2. [Date picker](https://www.npmjs.com/package/np-ui-date-picker)
3. [Time picker](https://www.npmjs.com/package/np-ui-time-picker)
4. [Color picker](https://www.npmjs.com/package/np-ui-color-picker)

## License
This project is licensed under the MIT License.

## Contributors
![](https://raw.githubusercontent.com/NilavPatel/nilavpatel.github.io/master/images/logo-large.png)