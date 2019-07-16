import { TemplateRef } from "@angular/core";

/**
 * grid column class
 */
export class NpColumn {

    /**constructor */
    constructor(item: {
        dataField: string;
        dataType: string;
        visible: boolean;
        width: number;
        caption: string;
        sortDirection: string;
        sortEnabled: boolean;
        filterEnabled: boolean;
        filterString: string;
        filterType: string;
        cellTemplate: TemplateRef<any>;
        onCellClick: any;
        styleClass: string;
    }) {
        this.dataField = item.dataField;
        this.dataType = item.dataType;
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
    public dataType: string; // possible data types are string, number, boolean, date
    public visible: boolean;
    public width: number;
    public caption: string;
    public sortDirection: string;
    public filterString: string;
    public filterType: string;
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
        return this.dataType ? this.dataType : "string";
    }

    /**get sorting class */
    public getSortingClass() {
        if (this.sortDirection && this.sortDirection === "asc") {
            return "sort-by-asc"
        }
        if (this.sortDirection && this.sortDirection === "desc") {
            return "sort-by-desc"
        }
    }
}