import { Routes } from '@angular/router';
import { RecordAllergyComponent } from './pages/record-allergy/record-allergy.component';
import { HistoryComponent } from './pages/history/history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent }, // Default route
    { path: 'dashboard', component: DashboardComponent },
    { path: 'record-allergy', component: RecordAllergyComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
  ];
