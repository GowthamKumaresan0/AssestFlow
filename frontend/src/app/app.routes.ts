import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AssetListComponent } from './components/asset-list/asset-list';
import { WorkOrderListComponent } from './components/work-order-list/work-order-list';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'assets', component: AssetListComponent },
    { path: 'work-orders', component: WorkOrderListComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];