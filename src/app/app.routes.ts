import { Routes } from '@angular/router';
import { RecordAllergyComponent } from './pages/record-allergy/record-allergy.component';
import { HistoryComponent } from './pages/history/history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent }, // Default route
    { path: 'dashboard', component: DashboardComponent }, // Default route
    { path: 'record-allergy', component: RecordAllergyComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'profile', component: ProfileComponent },
  ];
