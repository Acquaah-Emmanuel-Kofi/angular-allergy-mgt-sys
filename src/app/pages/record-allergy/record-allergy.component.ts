import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../components/toaster/toaster.service';
import { FormStep1Component } from './form-step1/form-step1.component';
import { FormStep2Component } from './form-step2/form-step2.component';
import { FormStep4Component } from './form-step4/form-step4.component';
import { FormStep3Component } from './form-step3/form-step3.component';

@Component({
  selector: 'app-record-allergy',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormStep1Component,
    FormStep2Component,
    FormStep3Component,
    FormStep4Component,
  ],
  templateUrl: './record-allergy.component.html',
  styleUrl: './record-allergy.component.scss',
})
export class RecordAllergyComponent {
  currentStep: number = 1;
  progressCount: number = 33.33333333333333;
  progress: number = 0;

  constructor(
    private _router: Router,
    private _toast: ToasterService
  ) {}

  formData: any = {};

  goBack(): void {
    this._router.navigate(['/dashboard']);
  }

  nextStep(formStepperData: FormGroup): void {
    if (this.currentStep < 4) {
      this.progress += this.progressCount;
      this.currentStep++;

      this.formData = { ...this.formData, ...formStepperData };
    }

    if (this.currentStep === 4) {
      console.log("Last Form");
      
      console.log(this.formData);
    }
  }

  prevStep(): void {    
    if (this.currentStep > 1) {
      this.progress -= this.progressCount;
      this.currentStep--;
    }
  }

  submitForm(): void {
    console.log('Clicked to submit');
    console.log(this.formData);
    this.removeFormDraft();

    // this._toast.showSuccess('Success!');
  }

  removeFormDraft(): void {
    localStorage.removeItem('STEP_1');
    localStorage.removeItem('STEP_2');
    localStorage.removeItem('STEP_3');
    localStorage.removeItem('STEP_4');
  }
}
