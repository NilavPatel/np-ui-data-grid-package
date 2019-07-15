export class NpDataSource {
    public data: any[];
    public isServerOperations: boolean;
    public load: (pageNumber: number, pageSize: number) => Promise<CustomStore>;
    public total: number;
}

export class CustomStore {
    public data: any[];
    public total: number;
}