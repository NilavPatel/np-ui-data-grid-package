# np-grid 

Angular Version ~8.0.0
lodash Version 4.17.11 or newer

## features
````
1. max row handling limit upto 10,00,000
2. client/server side paging
3. client/server side filtering
4. client/server side sorting
5. row selection
6. master-child row section
````

### How to add grid component in to page
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

### Properties
````
1.  [columns]    

    [
        { dataField: "Id", visible: true, width: 100, caption: "Id", dataType: DataTypes.number, sortEnabled: true, filterEnabled: true, onCellClick: this.cellClicked },
        { dataField: "FirstName", visible: true, width: 150, caption: "First Name", dataType: DataTypes.string, sortEnabled: true, filterEnabled: true },
        ...
    ]
    
    1.1 type posible values string, number, boolean, date from 
    1.2 dataField is name of the property from datasource array.
    1.3 set sortEnabled and filterEnabled on column basis (default false)
    1.4 cellTemplate : type of TemplateRef<any>, pass template to grid column, row data will be bind as let-row="row".
    1.5 onCellClick Event : arguments click event, column which is clicked, row.

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

7. [tableId]
    set html attribute id to component

8. [multiSelectEnable]=true OR [singleSelectEnable]=true
    Will show checkboxes in first column to select single/multiple rows.

9. [masterChildTemplate]="masterChildTemplate"
    Pass TemplateRef<any> type object to above attribute to dispay master child grid.
    if masterChildTemplate is passed then +, - icons will be displayed to open/close child view.

10. [isStickyHeader]=true
    If true then header will stick on top when scroll grid vertically.
````

### Methods
````
1.  onRowClick
    bind on row click event
````

### Apis
````
2.  goToPage(pageNumber: number)
    set page given in argument as current page

2.  getSelectedRowKeys()
    get selected rows

3.  reset() 
    reset data grid (remove sorting, filtering, selection)

4.  sortByColumn(dataField: string, direction: SortDirections)
    sort by column and direction

5.  filterByColumn(dataField: string, keyword: string, type: FilterTypes)
    filter by column name and keyword. Keyword will be based on datatype of column.

6. selectAll()
    select all rows

7. deSelectAll()
    deselect all rows

8. showLoader()
    show loader icon into grid UI

9. hideLoader()
    hide loader icon from grid UI

10. showColumnByIndex(idx: number)
    show column by index value

11. hideColumnByIndex(idx: number)
    hide column by index value

12. hideColumnByDataField(dataField: string)
    show column by field value

13. showColumnByDataField(dataField: string)
    hide column by field value

14. getTotalRows
    returns total rows count.

15. getCurrentPageNumber
    returns current page number.

16. getPageSize
    returns page size.
````