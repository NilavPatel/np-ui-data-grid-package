import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Column } from 'np-ui-data-grid/public-api';
@Pipe({
    name: 'filterColumnsPipe'
})
@Injectable()
export class NpFilterColumnsPipe implements PipeTransform {
    transform(filterList: Column[], args: string): any {
        if (args) {
            var result = filterList.filter(function (column: Column) {
                return column.getCaption().toLowerCase().startsWith(args, 0)
            });
            return result;
        }
        return filterList;
    }
}