import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterTypesPipe'
})
@Injectable()
export class NpFilterTypesPipe implements PipeTransform {
    transform(filterTypes: any[], args: string): any {
        return filterTypes.filter(filterType => filterType.forDataType.toLowerCase() === args.toLowerCase());
    }
}