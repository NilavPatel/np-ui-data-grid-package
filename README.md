# np-ui-data-grid

<img src="https://raw.githubusercontent.com/NilavPatel/np-ui-data-grid-package/master/src/assets/images/logo-large.png" width="300" height="80">

````
Data grid for Angular 8 and 8+
````

## [Demo](https://stackblitz.com/edit/np-ui-data-grid)

## NPM
````
npm i np-ui-data-grid
````

## Features
````
1. Maximum row handling capacity is upto 10,00,000 in client side mode
2. Client/Server side paging
3. Client/Server side filtering
4. Client/Server side sorting
5. Single and Multiple row selection
6. Master-child row section
7. Get/Set Column configurations
8. Store state of grid and change from dropdown (show/hide column, filters values and sorting is also saved in state).
9. Column drag and drop
````

## HTML
````
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
````
1.  [columns]    

    [
        { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: DataTypes.number, sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
        { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: DataTypes.string, sortEnabled: true, filterEnabled: true },
        ...
    ]
    
    1.1 dataType property is for setting type of data. user DataTypes class to get possible values.( data types are string, number, boolean, date)
    1.2 dataField is name of the property from datasource array. Needs to be same as it retrived in data source.
    1.3 caption is for setting column header, if not set then dataField will be displayed as caption.
    1.4 set sortEnabled and filterEnabled on column basis (default false)
    1.5 cellTemplate : type of TemplateRef<any>, pass template to grid column, row data will be bind as let-row="row".
    1.6 onCellClick Event : arguments click event, column which is clicked, row.
    1.7 rightAlignText : boolean , to make text right aligned

2.  [dataSource]
    dataSorce.data => Array of data (for client side only)
    if dataSorce.isServerOperations is set to true then add load function to get data from server side.
    dataSorce.load function has parameters like pageNumber, pageSize, sortColumns, filterColumns.

3.  [multiColumnSortEnable]
    if set to true then multiple columns can be sorted. Need to set sortEnabled = true in column too.
    Default table is working on single column sort.

4.  [height]
    add number to set height of data grid in px (default height is auto)

5.  [width]
    add number to set width of data grid in px (default width is auto)

6.  [key] 
    give primary column dataField as key. (default first column will be taken as key).

7.  [tableId]
    set html attribute id to component

8.  [multiSelectEnable]=true OR [singleSelectEnable]=true
    Will show checkboxes in first column to select single/multiple rows.

9.  [masterChildTemplate]="masterChildTemplate"
    Pass TemplateRef<any> type object to above attribute to dispay master child grid.
    if masterChildTemplate is passed then +, - icons will be displayed to open/close child view.

10. [isStickyHeader]=true
    If true then header will stick on top when scroll grid vertically.

11. [showColumnChooser]=true/false
    want to show button for column chooser or not.
    if set to true then on top of the data grid one button is avalable, where list of columns will be shown with Check boxes.
    On selecting check boxes columns will be show/hide.
    Column drag and drop is also given inside column chooser.

12. [title]
    give title to datagrid
    type is string.

13. [enableStateStoring]=true/false
    enable state storing or not, default is false.
    if state storing is enabled then only controls are visible for state storing.
````

## Apis
````
1.  goToPage(pageNumber: number)
    set page given in argument as current page

2.  getSelectedRowKeys()
    get selected rows

3.  reset() 
    reset data grid (remove sorting, filtering, selection)

4.  sortByColumn(dataField: string, direction: SortDirections)
    sort by column and direction

5.  filterByColumn(dataField: string, keyword: string, type: FilterTypes)
    filter by column name and keyword. Keyword will be based on datatype of column.

6.  selectAll()
    select all rows

7.  deSelectAll()
    deselect all rows

8.  showLoader()
    show loader icon into grid UI

9.  hideLoader()
    hide loader icon from grid UI

10. showColumnByIndex(idx: number)
    show column by index value. Start with index 0.

11. hideColumnByIndex(idx: number)
    hide column by index value. Start with index 0.

12. hideColumnByDataField(dataField: string)
    show column by field value

13. showColumnByDataField(dataField: string)
    hide column by field value

14. getTotalRows()
    returns total rows count.

15. getCurrentPageNumber()
    returns current page number.

16. getPageSize()
    returns page size.

17. getTotalPages()
    returns number of total pages in grid

18. closeAllChild()
    close all open childs

19. getFilterColumns()
    get filter columns list

20. getSortColumns()
    get sort columns list

21. getColumns()
    get columns list with current configurations

22. setColumns(columns: Column[])
    set columns configurations to data grid.

23. getAllState()
    get all state data which stored in data grid

24. setAllState(states: State[])
    set list of state to data grid.
    parameter is array of State object.

25. refresh()
    refresh current view data only.
````

## Methods
````
1.  onRowClick( event )
    bind on row click event.
    event.data contains the data of clicked row.

2.  onSelect ( event )
    bind on row select event
    fires when user select any row/ select all rows.
    event.data contains the selected row key/keys.

3.  onDeselect ( event )
    bind on row de select event
    fires when user de select any row or deselect all rows.
    event.data contains the de selected row key/keys
````

## All np-ui packages for Angular
1. [Data grid](https://www.npmjs.com/package/np-ui-data-grid)
2. [Date picker](https://www.npmjs.com/package/np-ui-date-picker)
3. [Time picker](https://www.npmjs.com/package/np-ui-time-picker)
4. [Color picker](https://www.npmjs.com/package/np-ui-color-picker)