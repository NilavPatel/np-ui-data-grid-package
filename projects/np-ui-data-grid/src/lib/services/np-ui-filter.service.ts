import { FilterTypes, DataTypes } from '../models/constants';

export class NpFilterService {
    filterData(filterColumns: any[], columns: any[], data: any[]): any[] {
        var that = this;
        filterColumns.forEach(element => {
            if (element.filterOperator === FilterTypes.StartsWith) {
                data = this._custFilter(data, function (a) {
                    return that._custStartWith(a[element.column].toLowerCase(), element.filterValue.toLowerCase());
                });
            } else if (element.filterOperator === FilterTypes.EndsWith) {
                data = this._custFilter(data, function (a) {
                    return that._custEndWith(a[element.column].toLowerCase(), element.filterValue.toLowerCase());
                });
            } else if (element.filterOperator === FilterTypes.Contains) {
                data = this._custFilter(data, function (a) {
                    return a[element.column].toLowerCase().indexOf(element.filterValue.toLowerCase()) !== -1;
                });
            } else if (element.filterOperator === FilterTypes.GreaterThan) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column] > parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column].setHours(0, 0, 0, 0) > new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.GreaterThanOrEquals) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column] >= parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column].setHours(0, 0, 0, 0) >= new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.LessThan) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column] < parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column].setHours(0, 0, 0, 0) < new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.LessThanOrEquals) {
                if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column] <= parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column].setHours(0, 0, 0, 0) <= new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.Equals) {
                if (element.dataType === DataTypes.Boolean) {
                    if (element.filterValue === "true") {
                        data = this._custFilter(data, function (a) {
                            return a[element.column] === true;
                        });
                    } else {
                        data = this._custFilter(data, function (a) {
                            return a[element.column] === false;
                        });
                    }
                } else if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column] === parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column].setHours(0, 0, 0, 0) === new Date(element.filterValue).setHours(0, 0, 0, 0);
                    });
                }
            } else if (element.filterOperator === FilterTypes.NotEquals) {
                if (element.dataType === DataTypes.Boolean) {
                    if (element.filterValue === "true") {
                        data = this._custFilter(data, function (a) {
                            return a[element.column] !== true;
                        });
                    } else {
                        data = this._custFilter(data, function (a) {
                            return a[element.column] !== false;
                        });
                    }
                } else if (element.dataType === DataTypes.Number) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column] !== parseInt(element.filterValue);
                    });
                } else if (element.dataType === DataTypes.Date) {
                    data = this._custFilter(data, function (a) {
                        return a[element.column].setHours(0, 0, 0, 0) !== new Date(element.filterValue).setHours(0, 0, 0, 0);
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