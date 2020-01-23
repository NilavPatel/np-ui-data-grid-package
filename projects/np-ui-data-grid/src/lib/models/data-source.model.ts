export class DataSource {
    public data: any[];
    public summary: any;
    public isServerOperations: boolean;
    public load: (pageNumber: number, pageSize: number, sortColumns?: any[], filterColumns?: any[]) => Promise<CustomStore>;
}

export class CustomStore {
    public data: any[];
    public total: number;
    public summary: any;
}