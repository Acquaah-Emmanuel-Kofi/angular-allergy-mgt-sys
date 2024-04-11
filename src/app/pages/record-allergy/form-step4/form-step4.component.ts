import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step4',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-step4.component.html',
  styleUrl: './form-step4.component.scss'
})
export class FormStep4Component implements OnInit {
  @Output() nextStepForm: EventEmitter<any> = new EventEmitter();
  @Output() prevStepForm: EventEmitter<any> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.draftFormData();
  }

  formStepper4 = this._formBuilder.group({
    occupationalOrEnvironmentalAllergens: ['', Validators.required],
    exposedToSmoke: ['', Validators.required],
    additionalInformation: ['', Validators.required],
  });

  // Method TO send form data to the next step form
  nextStep(): void {
    // Emit the FormGroup containing the form data
    this.nextStepForm.emit(this.formStepper4.value);
  }

  prevStep() {
    this.prevStepForm.emit();
  }

  draftFormData(): void {
    const data = localStorage.getItem('STEP_4');

    if (data) {
      this.formStepper4.setValue(JSON.parse(data));
    }

    this.formStepper4.valueChanges.subscribe((value) =>
      localStorage.setItem('STEP_4', JSON.stringify(value))
    );
  }
}
