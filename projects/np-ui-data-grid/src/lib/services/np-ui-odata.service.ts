import { Injectable } from "@angular/core";
import { DataTypes } from '../models/constants';

@Injectable()
export class NpODataService {
    buildQuery(top: number, skip: number, sortColumns: any[], filterColumns: any[], inlineCount?: string): string {
        var queryTmpArray = [];
        queryTmpArray.push('$count=true');
        if (inlineCount && inlineCount.length > 0) {
            queryTmpArray.push(`$inlinecount=${inlineCount}`);
        } else {
            queryTmpArray.push(`$top=${top}`);
            queryTmpArray.push(`$skip=${skip}`);
        }

        if (sortColumns) {
            let sortQueue = [];
            sortColumns.forEach(function (element) {
                sortQueue.push(element.column + " " + element.sortDirection);
            });
            if (sortQueue.length > 0) {
                queryTmpArray.push("$orderby=" + sortQueue.join(','));
            }
        }

        if (filterColumns) {            
            if (filterColumns && filterColumns.length == 1) {
                if (filterColumns[0].dataType == DataTypes.String) {
                    queryTmpArray.push("$filter=" + filterColumns[0].filterOperator + "(" + filterColumns[0].column + ",'" + filterColumns[0].filterValue + "')");
                } else {
                    queryTmpArray.push("$filter=" + filterColumns[0].column + " " + filterColumns[0].filterOperator + " " + filterColumns[0].filterValue);
                }
            }
            if (filterColumns && filterColumns.length > 1) {
                let filterQueue = [];
                filterColumns.forEach(function (element) {
                    if (element.dataType == DataTypes.String) {
                        filterQueue.push(element.filterOperator + "(" + element.column + ",'" + element.filterValue + "')");
                    } else {
                        filterQueue.push(element.column + " " + element.filterOperator + " " + element.filterValue);
                    }
                });
                if (filterQueue.length > 1) {
                    queryTmpArray.push("$filter=" + filterQueue.join(' and '));
                }
            }
        }

        return queryTmpArray.join('&');
    }
}