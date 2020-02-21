import { Injectable } from "@angular/core";

@Injectable()
export class NpODataService {
    buildQuery(top: number, skip: number, sortColumns: any[], filterColumns: any[]): string {
        var queryTmpArray = [];
        queryTmpArray.push('$count=true');
        queryTmpArray.push(`$top=${top}`);
        queryTmpArray.push(`$skip=${skip}`);

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
                queryTmpArray.push("$filter=" + filterColumns[0].column + " " + filterColumns[0].filterOperator + " " + filterColumns[0].filterValue);
            }
            if (filterColumns && filterColumns.length > 1) {
                let filterQueue = [];
                filterColumns.forEach(function (element) {
                    filterQueue.push(element.column + " " + element.filterOperator + " " + element.filterValue);
                });
                if (filterQueue.length > 1) {
                    queryTmpArray.push("$filter=" + filterQueue.join(' and '));
                }
            }
        }

        return queryTmpArray.join('&');
    }
}