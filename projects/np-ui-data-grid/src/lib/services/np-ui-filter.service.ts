import { FilterTypes, DataTypes } from '../models/constants';
import { Injectable } from "@angular/core";

@Injectable()
export class NpFilterService {
    filterData(filterColumns: any[], columns: any[], data: any[]): any[] {
        var that = this;
        filterColumns.forEach(element => {
            if (element.filterOperator === FilterTypes.StartsWith) {
                data = this._custFilter(data, function (a) {
                    return that._custStartWith(a[element.dataField].toLowerCase(), element.filterValue.toLowerCase());
                });
            } else if (element.filterOperator === FilterTypes.EndsWith) {
                data = this._custFilter(data, function (a) {
                    return that._custEndWith(a[element.dataField].toLowerCase(), element.filterValue.toLowerCase());
                });
            } else if (element.filterOperator === FilterTypes.Contains) {
                data = this._custFilter(data, function (a) {
                    return a[element.dataField].toLowerCase().indexOf(element.filterValue.toLowerCase()) !== -1;
                });
            } else if (element.filterOperator === FilterTypes.GreaterThan) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField] > parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField].setHours(0, 0, 0, 0) > new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.GreaterThanOrEquals) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField] >= parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField].setHours(0, 0, 0, 0) >= new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.LessThan) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField] < parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField].setHours(0, 0, 0, 0) < new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.LessThanOrEquals) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField] <= parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField].setHours(0, 0, 0, 0) <= new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.Equals) {
                if (element.dataType === DataTypes.Boolean) {
                    if (element.filterValue === "true") {
                        data = this._custFilter(data, function (a) {
                            return a[element.dataField] === true;
                        });
                    } else {
                        data = this._custFilter(data, function (a) {
                            return a[element.dataField] === false;
                        });
                    }
                } else if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField] === parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField].setHours(0, 0, 0, 0) === new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.NotEquals) {
                if (element.dataType === DataTypes.Boolean) {
                    if (element.filterValue === "true") {
                        data = this._custFilter(data, function (a) {
                            return a[element.dataField] !== true;
                        });
                    } else {
                        data = this._custFilter(data, function (a) {
                            return a[element.dataField] !== false;
                        });
                    }
                } else if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField] !== parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.dataField].setHours(0, 0, 0, 0) !== new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            }
        });
        return data;
    }

    private _custFilter(arr: any[], fun: any) {
        return arr.filter(fun);
    }

    private _custStartWith(value: string, searchVal: string) {
        return value.startsWith(searchVal, 0)
    }

    private _custEndWith(value: string, searchVal: string) {
        return value.endsWith(searchVal)
    }
}