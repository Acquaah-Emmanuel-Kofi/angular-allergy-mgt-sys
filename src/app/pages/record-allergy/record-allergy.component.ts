import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../components/toaster/services/toaster.service';
import { FormStep1Component } from './form-step1/form-step1.component';
import { FormStep2Component } from './form-step2/form-step2.component';
import { FormStep4Component } from './form-step4/form-step4.component';
import { FormStep3Component } from './form-step3/form-step3.component';
import { ModalService } from '../../components/modal/services/modal.service';
import { FormData } from '../../interfaces/allergies.interface';
import { AllergiesService } from '../../services/data/allergies.service';

@Component({
  selector: 'app-record-allergy',
  standalone: true,
  imports: [
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
    private _toast: ToasterService,
    private _allergyService: AllergiesService
  ) {}

  experiencedSymptomsList: string = '';
  whenSypmtomsOccured: string = '';

  formData: FormData = {
    medicalCondition: '',
    medicalConditionExplained: '',
    onMedication: '',
    allergySymptoms: '',
    symptomSeverity: '',
    causeOfSymptom: '',
    timesOfReaction: '',
    allergyExposedTo: '',
    doesTheUserSmoke: '',
    additionalNotes: '',
  };

  goBack(): void {
    this._router.navigateByUrl('/dashboard');
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.progress += this.progressCount;
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.progress -= this.progressCount;
      this.currentStep--;
    }
  }

  submitForm(): void {
    this._allergyService.sendAllergyData(this.formData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this._toast.showSuccess('Success!');
          this._router.navigateByUrl('/history');
        }
      },
      error: (err) => {
        this._toast.showSuccess(err.message);
      },
    });
  }

  // Function to handle checkbox change event
  handleSymptomsChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedValue = target.value;
    const isChecked = target.checked;

    let data = '';

    if (isChecked) {
      // Append the selected value to the string
      data += selectedValue + ', ';
    } else if (!isChecked && selectedValue) {
      // Replace the selected value with an empty string
      data = data.replace(selectedValue + ', ', '');
    }

    console.log(data);

    return data;
  }

  handleSymptomsOccuredChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedValue = target.value;
    const isChecked = target.checked;

    if (isChecked) {
      // Append the selected value to the string
      this.experiencedSymptomsList += selectedValue + ', ';
    } else if (!isChecked && selectedValue) {
      // Replace the selected value with an empty string
      this.experiencedSymptomsList = this.experiencedSymptomsList.replace(
        selectedValue + ', ',
        ''
      );
    }

    console.log(this.experiencedSymptomsList);
  }
}
