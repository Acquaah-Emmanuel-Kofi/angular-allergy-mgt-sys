import { Routes } from '@angular/router';
import { RecordAllergyComponent } from './pages/record-allergy/record-allergy.component';
import { HistoryComponent } from './pages/history/history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HistorydetailsComponent } from './components/historydetails/historydetails.component';
import { authGuard } from './auth-guard/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Default route
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'record-allergy',
    component: RecordAllergyComponent,
    canActivate: [authGuard],
  },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'history/details/:id',
    component: HistorydetailsComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
