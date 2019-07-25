export class Constants {
    static filters(): any[] {
        return [{
            name: FilterTypes.StartWith,
            text: "Start with",
            forDataType: DataTypes.string
        },
        {
            name: FilterTypes.EndWith,
            text: "End with",
            forDataType: DataTypes.string
        },
        {
            name: FilterTypes.Contains,
            text: "Contains",
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
            text: "<",
            forDataType: DataTypes.date
        }, {
            name: FilterTypes.LessThan,
            text: ">",
            forDataType: DataTypes.date
        }, {
            name: FilterTypes.Equals,
            text: "=",
            forDataType: DataTypes.date
        }];
    }
}

export enum FilterTypes {
    StartWith,
    EndWith,
    Contains,
    GreaterThan,
    LessThan,
    Equals
}

export enum DataTypes {
    number,
    string,
    date,
    boolean
}

export enum SortDirections {
    Ascending,
    Descending
}