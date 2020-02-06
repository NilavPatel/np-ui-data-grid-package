import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import * as _ from 'lodash';

let data: any[];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() {
        data = this._getDataList(1000);
    }

    _getDataList(count: number) {
        var names = ["Nilav", "Hemal", "Hardik", "Brijesh"];
        var surNames = ["Patel", "Patidar"];

        var data = [];
        for (var i = 1; i <= count; i++) {
            data.push(getDataRow(i));
        }

        return data;

        function getDataRow(id) {
            return {
                Id: id,
                FirstName: names[Math.floor(Math.random() * names.length)],
                LastName: surNames[Math.floor(Math.random() * surNames.length)],
                Age: Math.floor(Math.random() * 80) + 1,
                Active: (Math.round(Math.random() % 2) == 0),
                BirthDate: new Date()
            }
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;


        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/getAll') && method === 'GET':
                    return getAll();
                case url.endsWith('/getDataUsingLoadOptions') && method === 'POST':
                    return getDataUsingLoadOptions(body);
            }
        }

        // route functions

        function getAll() {
            return ok(data);
        }

        function getDataUsingLoadOptions(loadOptions) {
            var data2 = data;

            if (loadOptions.filterColumns && loadOptions.filterColumns.length > 0) {
                data2 = _filterDataSource(data2, loadOptions.filterColumns);
            }

            if (loadOptions.sortColumns && loadOptions.sortColumns.length > 0) {
                loadOptions.sortColumns.forEach(element => {
                    data2 = _.orderBy(data2, element.column, element.sortDirection);
                });
            }

            let startIndex = (loadOptions.pageNumber - 1) * loadOptions.pageSize;
            let endIndex = Math.min(startIndex + loadOptions.pageSize - 1, 1000 - 1);

            var result = { data: data2.slice(startIndex, endIndex + 1), total: data2.length }
            return ok(result);
        }

        // helper functions

        function _filterDataSource(data, filterColumns) {
            filterColumns.forEach(element => {
                if (element.filterOperator == "startsWith") {
                    data = _.filter(data, function (a) {
                        return _.startsWith(a[element.column].toLowerCase(), element.filterValue.toLowerCase());
                    });
                } else if (element.filterOperator == "endsWith") {
                    data = _.filter(data, function (a) {
                        return _.endsWith(a[element.column].toLowerCase(), element.filterValue.toLowerCase());
                    });
                } else if (element.filterOperator == "contains") {
                    data = _.filter(data, function (a) {
                        return a[element.column].toLowerCase().indexOf(element.filterValue.toLowerCase()) !== -1;
                    });
                } else if (element.filterOperator == "gt") {
                    if (element.dataType == "number") {
                        data = _.filter(data, function (a) {
                            return a[element.column] > parseInt(element.filterValue);
                        });
                    } else if (element.dataType == "date") {
                        data = _.filter(data, function (a) {
                            return a[element.column].setHours(0, 0, 0, 0) > new Date(element.filterValue).setHours(0, 0, 0, 0);
                        });
                    }
                } else if (element.filterOperator == "lt") {
                    if (element.dataType == "number") {
                        data = _.filter(data, function (a) {
                            return a[element.column] < parseInt(element.filterValue);
                        });
                    } else if (element.dataType == "date") {
                        data = _.filter(data, function (a) {
                            return a[element.column].setHours(0, 0, 0, 0) < new Date(element.filterValue).setHours(0, 0, 0, 0);
                        });
                    }
                } else if (element.filterOperator == "equals") {
                    if (element.dataType == "boolean") {
                        if (element.filterValue == "true") {
                            data = _.filter(data, function (a) {
                                return a[element.column] == true;
                            });
                        } else {
                            data = _.filter(data, function (a) {
                                return a[element.column] == false;
                            });
                        }
                    } else if (element.dataType == "number") {
                        data = _.filter(data, function (a) {
                            return a[element.column] === parseInt(element.filterValue);
                        });
                    } else if (element.dataType == "date") {
                        data = _.filter(data, function (a) {
                            return a[element.column].setHours(0, 0, 0, 0) == new Date(element.filterValue).setHours(0, 0, 0, 0);
                        });
                    }
                }
                else if (element.filterOperator == "notEquals") {
                    if (element.dataType == "boolean") {
                        if (element.filterValue == "true") {
                            data = _.filter(data, function (a) {
                                return a[element.column] != true;
                            });
                        } else {
                            data = _.filter(data, function (a) {
                                return a[element.column] != false;
                            });
                        }
                    } else if (element.dataType == "number") {
                        data = _.filter(data, function (a) {
                            return a[element.column] !== parseInt(element.filterValue);
                        });
                    } else if (element.dataType == "date") {
                        data = _.filter(data, function (a) {
                            return a[element.column].setHours(0, 0, 0, 0) != new Date(element.filterValue).setHours(0, 0, 0, 0);
                        });
                    }
                }
            });
            return data;
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};