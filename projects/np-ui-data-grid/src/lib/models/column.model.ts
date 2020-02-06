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
        filterValue: string;
        filterOperator: FilterTypes;
        cellTemplate: TemplateRef<any>;
        onCellClick: any;
        styleClass: string;
        rightAlignText: boolean;
    }) {
        this.dataField = item.dataField;
        this.dataType = item.dataType == undefined || item.dataType == null ? DataTypes.String : item.dataType;
        this.visible = item.visible;
        this.width = item.width;
        this.caption = item.caption;
        this.sortDirection = item.sortDirection;
        this.filterValue = item.filterValue;
        this.filterOperator = item.filterOperator;
        this.sortEnabled = item.sortEnabled;
        this.filterEnabled = item.filterEnabled;
        this.cellTemplate = item.cellTemplate;
        this.onCellClick = item.onCellClick;
        this.styleClass = item.styleClass;
        this.rightAlignText = item.rightAlignText;
    }

    public dataField: string;
    public dataType: DataTypes;
    public visible: boolean;
    public width: number;
    public caption: string;
    public sortDirection: SortDirections;
    public filterValue: string;
    public filterOperator: FilterTypes;
    public sortEnabled: boolean;
    public filterEnabled: boolean;
    public cellTemplate: TemplateRef<any>;
    public onCellClick: any;
    public styleClass: string;
    public rightAlignText: boolean;

    /**get caption for column */
    public getCaption() {
        return this.caption ? this.caption : this.dataField;
    }

    /**get data type of column */
    public getDataType() {
        return this.dataType ? this.dataType : DataTypes.String;
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