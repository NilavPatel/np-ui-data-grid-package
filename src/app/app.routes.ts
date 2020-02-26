import { Routes } from '@angular/router'
import { ClientGridComponent } from './client-grid/client-grid.component';
import { ServerGridComponent } from './server-grid/server-grid.component';
import { SortingGridComponent } from './sorting-grid/sorting-grid.component';
import { FilterGridComponent } from './filter-grid/filter-grid.component';
import { CelltemplateGridComponent } from './celltemplate-grid/celltemplate-grid.component';
import { ToolbarGridComponent } from './toolbar-grid/toolbar-grid.component';
import { ColumnsGridComponent } from './columns-grid/columns-grid.component';
import { RowSelectGridComponent } from './row-select-grid/row-select-grid.component';
import { MasterChildGridComponent } from './master-child-grid/master-child-grid.component';
import { SummaryGridComponent } from './summary-grid/summary-grid.component';

export const appRoutes: Routes = [
    { path: 'client-grid', component: ClientGridComponent },
    { path: 'server-grid', component: ServerGridComponent },
    { path: 'sorting-grid', component: SortingGridComponent },
    { path: 'filter-grid', component: FilterGridComponent },
    { path: 'celltemplate-grid', component: CelltemplateGridComponent },
    { path: 'toolbar-grid', component: ToolbarGridComponent },
    { path: 'columns-grid', component: ColumnsGridComponent },
    { path: 'row-select-grid', component: RowSelectGridComponent },
    { path: 'master-child-grid', component: MasterChildGridComponent },
    { path: 'summary-grid', component: SummaryGridComponent },
    { path: '**', redirectTo: "/client-grid" }
];
