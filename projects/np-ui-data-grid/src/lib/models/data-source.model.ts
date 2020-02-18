export class DataSource {
    constructor(data: any[], total?: number, summary?: any) {
        this.data = data;
        this.total = total;
        this.summary = summary;
    }
    public data: any[];
    public total: number;
    public summary: any;
}