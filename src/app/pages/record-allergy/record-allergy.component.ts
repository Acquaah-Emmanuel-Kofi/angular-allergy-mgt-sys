import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutComponent } from '../../components/layout/layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-allergy',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './record-allergy.component.html',
  styleUrl: './record-allergy.component.scss'
})
export class RecordAllergyComponent {
  appName = 'Aller Gus';

  stepperForm: FormGroup | undefined;
  currentStep: number = 1;
  progressPercentage: number = 25;
  progress: number = 0;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.stepperForm = this.formBuilder.group({
      // Define form controls for each step
      step1Data: ['', Validators.required],
      step2Data: ['', Validators.required],
      // Add more form controls for additional steps as needed
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

    nextStep(): void {
      console.log("Clicked to next step");
      
      if (this.currentStep < 4) {
        this.progress += 33.33333333333333;
        this.currentStep++;
      }
    }
  
    prevStep(): void {
      console.log("Clicked to previous step");
      
      if (this.currentStep > 1) {
        this.progress -= 33.33333333333333;
        this.currentStep--;
      }
    }
  
    submitForm(): void {
      console.log("Clicked to submit");
      
      // if (this.stepperForm.valid) {
      //   // Submit form data
      // } else {
      //   // Handle form validation errors
      // }
    }
}
