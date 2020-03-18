import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Column } from '../models/column.model';
@Pipe({
    name: 'filterColumnsPipe'
})
@Injectable()
export class NpFilterColumnsPipe implements PipeTransform {
    transform(filterList: Column[], args: string): any {
        if (args) {
            var result = filterList.filter(function (column: Column) {
                return column.caption.toLowerCase().startsWith(args, 0)
            });
            return result;
        }
        return filterList;
    }
}