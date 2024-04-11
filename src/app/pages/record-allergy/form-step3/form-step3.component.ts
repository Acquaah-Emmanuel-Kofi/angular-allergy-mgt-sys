import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step3',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-step3.component.html',
  styleUrl: './form-step3.component.scss',
})
export class FormStep3Component implements OnInit {
  @Output() nextStepForm: EventEmitter<any> = new EventEmitter();
  @Output() prevStepForm: EventEmitter<any> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.draftFormData();
  }

  formStepper3 = this._formBuilder.group({
    whenSymptomsOccur: ['', Validators.required],
    symptomsSeverity: ['', Validators.required],
    timesOfReaction: ['', Validators.required],
    medicationsOrTreatments: ['', Validators.required]
  });

  // Method TO send form data to the next step form
  nextStep(): void {
    // Emit the FormGroup containing the form data
    this.nextStepForm.emit(this.formStepper3.value);
  }

  prevStep() {
    this.prevStepForm.emit();
  }

  draftFormData(): void {
    const data = localStorage.getItem('STEP_3');

    if (data) {
      this.formStepper3.setValue(JSON.parse(data));
    }

    this.formStepper3.valueChanges.subscribe((value) =>
      localStorage.setItem('STEP_3', JSON.stringify(value))
    );
  }
}
