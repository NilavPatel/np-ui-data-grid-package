export class NpDataSource {
    public data: any[];
    public isServerOperations: boolean;
    public load: (pageNumber: number, pageSize: number, sortColumns: any[]) => Promise<CustomStore>;
}

export class CustomStore {
    public data: any[];
    public total: number;
}