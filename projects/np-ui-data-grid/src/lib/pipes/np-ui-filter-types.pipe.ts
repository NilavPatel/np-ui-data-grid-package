import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DataTypes, FilterTypes } from '../models/constants';
@Pipe({
    name: 'filterTypesPipe'
})
@Injectable()
export class NpFilterTypesPipe implements PipeTransform {
    transform(filterList: any[], args: string): any {
        var result = filterList.filter(filterType => filterType.forDataType === args);
        result.push({
            name: FilterTypes.Reset,
            text: "Reset",
            forDataType: null
        });
        return result;
    }
}