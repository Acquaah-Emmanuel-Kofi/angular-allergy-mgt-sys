import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step2',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-step2.component.html',
  styleUrl: './form-step2.component.scss'
})
export class FormStep2Component implements OnInit {
  @Output() nextStepForm: EventEmitter<any> = new EventEmitter();
  @Output() prevStepForm: EventEmitter<any> = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.draftFormData();
  }

  formStepper2 = this._formBuilder.group({
    experiencedSymptoms: [''],
    symptomsDuration: ['', Validators.required],
    symptomsSeverity: ['', Validators.required],
  });

  // Method TO send form data to the next step form
  nextStep(): void {
    // Emit the FormGroup containing the form data
    this.nextStepForm.emit(this.formStepper2.value);
  }

  prevStep( ){
    this.prevStepForm.emit();
  }

  draftFormData(): void {
    const data = localStorage.getItem('STEP_2');

    if (data) {
      this.formStepper2.setValue(JSON.parse(data));
    }

    this.formStepper2.valueChanges.subscribe((value) =>
      localStorage.setItem('STEP_2', JSON.stringify(value))
    );
  }
}
