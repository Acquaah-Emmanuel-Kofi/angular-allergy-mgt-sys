import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-step1',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-step1.component.html',
  styleUrl: './form-step1.component.scss',
})
export class FormStep1Component implements OnInit {
  @Output() nextStepForm: EventEmitter<any> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.draftFormData();
  }

  formStepper1 = this._formBuilder.group({
    allergicReactionsExperienced: ['', Validators.required],
    hasExistingMedicalCondition: ['', Validators.required],
    takingMedication: ['', Validators.required],
  });

  // Method TO send form data to the next step form
  nextStep(): void {
    // Emit the FormGroup containing the form data
    this.nextStepForm.emit(this.formStepper1.value);
  }

  draftFormData(): void {
    const data = localStorage.getItem('STEP_1');

    if (data) {
      this.formStepper1.setValue(JSON.parse(data));
    }

    this.formStepper1.valueChanges.subscribe((value) =>
      localStorage.setItem('STEP_1', JSON.stringify(value))
    );
  }
}
