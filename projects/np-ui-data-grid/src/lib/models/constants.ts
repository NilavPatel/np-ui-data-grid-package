export class NpConstants {
    static filterTypes(): any[] {
        return [{
            name: "startWith",
            text: "Start with",
            forDataType: "string"
        },
        {
            name: "endWith",
            text: "End with",
            forDataType: "string"
        },
        {
            name: "contains",
            text: "Contains",
            forDataType: "string"
        },
        {
            name: "greaterThan",
            text: ">",
            forDataType: "number"
        },
        {
            name: "lessThan",
            text: "<",
            forDataType: "number"
        }, {
            name: "equals",
            text: "=",
            forDataType: "number"
        },
        {
            name: "equals",
            text: "=",
            forDataType: "boolean"
        },
        {
            name: "dateLessThan",
            text: "<",
            forDataType: "date"
        }, {
            name: "dateGreaterThan",
            text: ">",
            forDataType: "date"
        }, {
            name: "dateEquals",
            text: "=",
            forDataType: "date"
        }];
    }
}