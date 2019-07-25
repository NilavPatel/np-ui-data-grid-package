import { TemplateRef } from "@angular/core";
import { FilterTypes, DataTypes, SortDirections } from './constants';

/**
 * grid column class
 */
export class Column {

    /**constructor */
    constructor(item: {
        dataField: string;
        dataType: DataTypes;
        visible: boolean;
        width: number;
        caption: string;
        sortDirection: SortDirections;
        sortEnabled: boolean;
        filterEnabled: boolean;
        filterString: string;
        filterType: FilterTypes;
        cellTemplate: TemplateRef<any>;
        onCellClick: any;
        styleClass: string;
    }) {
        this.dataField = item.dataField;
        this.dataType = item.dataType == undefined || item.dataType == null ? DataTypes.string : item.dataType;
        this.visible = item.visible;
        this.width = item.width;
        this.caption = item.caption;
        this.sortDirection = item.sortDirection;
        this.filterString = item.filterString;
        this.filterType = item.filterType;
        this.sortEnabled = item.sortEnabled;
        this.filterEnabled = item.filterEnabled;
        this.cellTemplate = item.cellTemplate;
        this.onCellClick = item.onCellClick;
        this.styleClass = item.styleClass;
    }

    public dataField: string;
    public dataType: DataTypes;
    public visible: boolean;
    public width: number;
    public caption: string;
    public sortDirection: SortDirections;
    public filterString: string;
    public filterType: FilterTypes;
    public sortEnabled: boolean;
    public filterEnabled: boolean;
    public cellTemplate: TemplateRef<any>;
    public onCellClick: any;
    public styleClass: string;

    /**get caption for column */
    public getCaption() {
        return this.caption ? this.caption : this.dataField;
    }

    /**get data type of column */
    public getDataType() {
        return this.dataType ? this.dataType : DataTypes.string;
    }

    /**get sorting class */
    public getSortingClass() {
        if (this.sortDirection == SortDirections.Ascending) {
            return "sort-by-asc"
        }
        if (this.sortDirection == SortDirections.Descending) {
            return "sort-by-desc"
        }
    }
}