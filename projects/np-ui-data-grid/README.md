# np-ui-data-grid
Data grid custom component for Angular 8 and 8+, Created using only Angular.
## Check demo [Here](https://stackblitz.com/edit/np-ui-data-grid)
## NPM
`$ npm i np-ui-data-grid`

## Features
* Maximum row handling capacity is upto 10,00,000 in client side mode
* Client/Server side Paging
* Client/Server side Filtering
* Client/Server side Sorting
* Single and Multiple row selection
* Master-child row section
* Get/Set Column configurations
* Store state of grid and change from dropdown (show/hide column, filters values and sorting is also saved in state).
* Column drag and drop.
* Summary in datagrid footer.

## HTML
````html
<np-ui-data-grid 
    [columns]="gridColumns" 
    [dataSource]="gridDataSource" 
    [multiColumnSortEnable]=true
    [masterChildTemplate]="masterChildTemplate" 
    [height]="400" 
    [width]="1000" 
    [isStickyHeader]="true"
    [multiSelectEnable]="true">
</np-ui-data-grid>
````

## Properties
1.  `[columns]`  
    Example:
    ````javascript
    [
        { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: DataTypes.Number, sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
        { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: DataTypes.String, sortEnabled: true, filterEnabled: true }
    ]
    ````
    
    1.1 `dataType` property is for setting type of data. use **DataTypes** to get possible values.  
    ( data types are string, number, boolean, date)  
    1.2 `dataField` is name of the property from datasource array. Needs to be same as it retrived in data source.  
    1.3 `caption` is for setting column header, if not set then "dataField" will be displayed as caption.  
    1.4 Set `sortEnabled` and `filterEnabled` on column basis (default false)  
    1.5 `cellTemplate` : TemplateRef<any>, pass template to grid column, row data will be bind as let-row="row".  
    1.6 `onCellClick` bind on cell click event, in argument column data is passed for which column is clicked.  
    1.7 `rightAlignText` : boolean , to make text right aligned.  
    1.8 Filter event will fired on change event of filter input/filter type.  
2.  `[dataSource]`  
    **CLIENT SIDE**  
    `dataSource.data` : any[] => Array of data (for client side only)  
    **SERVER SIDE**  
    if `[dataSource.isServerOperations]` is set to true then add load function to get data from server side.  
    `[dataSource.load]` function has parameters like `pageNumber`, `pageSize`, `sortColumns`, `filterColumns`.  
    2.1 `sortColumns` is an array of {column : string, sortDirection: string}.  
        possible values for sortDirection are asc, desc.  
    2.2 `filterColumns` is an array of  
    ````javascript
        { column : string, filterOprator: string, filterValue: string, dataType: string}
    ````
    possible values for **filterOprator** are startsWith, endsWith, contains, gt, ls, gte, lte, equals, notEquals.  
    possible values for **dataType** are number, string, date, boolean.  
3.  `[multiColumnSortEnable]`  
    if set to true then multiple columns can be sorted. Need to set sortEnabled = true in column too.  
    Default table is working on single column sort.  
4.  `[height]`: number  
    add number to set height of data grid in px (default height is auto)  
5.  `[width]`: number  
    add number to set width of data grid in px (default width is auto)  
6.  `[key]`: string  
    give primary column dataField as key. (default first column will be taken as key).  
7.  `[tableId]`: string  
    set html attribute id to component  
8.  `[multiSelectEnable]` : boolean OR `[singleSelectEnable]` : boolean  
    Will show checkboxes in first column to select single/multiple rows.  
9.  `[masterChildTemplate]` : TemplateRef<any>  
    Pass TemplateRef<any> type object to above attribute to dispay master child grid.  
    if masterChildTemplate is passed then +, - icons will be displayed to open/close child view.  
10. `[isStickyHeader]` : boolean  
    If true then header will stick on top when scroll grid vertically.  
11. `[showColumnChooser]` : boolean  
    want to show button for column chooser or not.  
    if set to true then on top of the data grid one button is avalable,  
    where list of columns will be shown with Check boxes.  
    On selecting check boxes columns will be show/hide.  
    Column drag and drop is also given inside column chooser.  
12. `[title]` : string  
    give title to datagrid  
    type is string.  
13. `[enableStateStoring]` : boolean  
    enable state storing or not, default is false.  
    if state storing is enabled then only controls are visible for state storing.  
14. `[noDataMessage]` : string  
    Message will be displayed if no data found for data grid.  
    Default value is "No Data Found."  
15. `[showFilters]` : boolean  
    default value of show filters is true, this is only used to show/hide row of filters.  
    If any visible column is defined with filterenabled true then filters will be shown for that column,  
    but using this showFilter property you can show/hide whole row of filters.  
16. `[isShowSummary]`  
    default value is false. To show/hide summary at footer of datagrid.  
17. `[summaryTemplate]` : TemplateRef<any>  
    Template reference for summary at footer of datagrid.  
    **CLIENT SIDE**  
    To show summary in client side pass summary variable in DataSource.summary.  
    Which data is accessible in template context.   
    **SERVER SIDE**  
    To show summary in client side pass summary variable in CustomStore.summary.  
    Which data is accessible in template context.  

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

## Other np-ui components for Angular
1. [Data grid](https://www.npmjs.com/package/np-ui-data-grid)
2. [Date picker](https://www.npmjs.com/package/np-ui-date-picker)
3. [Time picker](https://www.npmjs.com/package/np-ui-time-picker)
4. [Color picker](https://www.npmjs.com/package/np-ui-color-picker)

## License
This project is licensed under the MIT License.

## Contributors
![](https://raw.githubusercontent.com/NilavPatel/nilavpatel.github.io/master/images/logo-large.png)