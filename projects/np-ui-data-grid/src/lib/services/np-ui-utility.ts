import { SortDirections } from '../models/constants';

export class NpUtilityService {
    custFilter(arr: any[], fun: any) {
        return arr.filter(fun);
    }

    custFind(arr: any[], fun: any): any {
        return arr.find(fun);
    }

    custSort(arr: any[], ele: string, order: string) {
        if (order == SortDirections.Descending) {
            return arr.concat().sort(this.sortByDesc(ele));
        } else {
            return arr.concat().sort(this.sortBy(ele));
        }
    }

    sortBy = (key) => {
        return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
    };

    sortByDesc = (key) => {
        return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
    };
}