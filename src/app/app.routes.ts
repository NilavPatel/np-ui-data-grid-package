import { Routes } from '@angular/router'
import { ClientGridComponent } from './client-grid/client-grid.component';
import { ServerGridComponent } from './server-grid/server-grid.component';
import { SortingGridComponent } from './sorting-grid/sorting-grid.component';

export const appRoutes: Routes = [
    { path: 'client-grid', component: ClientGridComponent },
    { path: 'server-grid', component: ServerGridComponent },
    { path: 'sorting', component: SortingGridComponent },
    { path: '**', redirectTo: "/client-grid" }
];
