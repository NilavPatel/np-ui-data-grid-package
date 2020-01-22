export class Constants {
    static filters(): any[] {
        return [{
            name: FilterTypes.StartWith,
            text: "abc*",
            forDataType: DataTypes.string
        },
        {
            name: FilterTypes.EndWith,
            text: "*abc",
            forDataType: DataTypes.string
        },
        {
            name: FilterTypes.Contains,
            text: "*abc*",
            forDataType: DataTypes.string
        },
        {
            name: FilterTypes.GreaterThan,
            text: ">",
            forDataType: DataTypes.number
        },
        {
            name: FilterTypes.LessThan,
            text: "<",
            forDataType: DataTypes.number
        }, {
            name: FilterTypes.Equals,
            text: "=",
            forDataType: DataTypes.number
        },
        {
            name: FilterTypes.Equals,
            text: "=",
            forDataType: DataTypes.boolean
        },
        {
            name: FilterTypes.GreaterThan,
            text: ">",
            forDataType: DataTypes.date
        }, {
            name: FilterTypes.LessThan,
            text: "<",
            forDataType: DataTypes.date
        }, {
            name: FilterTypes.Equals,
            text: "=",
            forDataType: DataTypes.date
        }];
    }
}

export enum FilterTypes {
    StartWith = "StartWith",
    EndWith = "EndWith",
    Contains = "Contains",
    GreaterThan = "GreaterThan",
    LessThan = "LessThan",
    Equals = "Equals"
}

export enum DataTypes {
    number = "number",
    string = "string",
    date = "date",
    boolean = "boolean"
}

export enum SortDirections {
    Ascending = "Ascending",
    Descending = "Descending"
}