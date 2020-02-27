import { TemplateRef } from "@angular/core";
import { FilterTypes, DataTypes, SortDirections } from './constants';

/**
 * grid column class
 */
export class Column {

    /**constructor */
    constructor(item: any) {
        this.dataField = item["dataField"];
        this.dataType = item["dataType"] == undefined || item["dataType"] == null ? DataTypes.String : item["dataType"];
        this.visible = item["visible"];
        this.width = item["width"];
        this.caption = item["caption"];
        this.sortDirection = item["sortDirection"];
        this.filterValue = item["filterValue"];
        this.filterOperator = item["filterOperator"];
        this.sortEnable = item["sortEnable"];
        this.filterEnable = item["filterEnable"];
        this.cellTemplate = item["cellTemplate"];
        this.onCellClick = item["onCellClick"];
        this.styleClass = item["styleClass"];
        this.rightAlignText = item["rightAlignText"];
    }

    public dataField: string;
    public dataType: DataTypes;
    public visible: boolean;
    public width: number;
    public caption: string;
    public sortDirection: SortDirections;
    public filterValue: string;
    public filterOperator: FilterTypes;
    public sortEnable: boolean;
    public filterEnable: boolean;
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