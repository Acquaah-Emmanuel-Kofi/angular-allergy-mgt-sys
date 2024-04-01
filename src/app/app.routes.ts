import { Routes } from '@angular/router';
import { RecordAllergyComponent } from './pages/record-allergy/record-allergy.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent }, // Default route
    { path: 'record-allergy', component: RecordAllergyComponent },
  ];
