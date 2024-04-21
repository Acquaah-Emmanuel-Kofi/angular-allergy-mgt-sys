import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormData } from '../../../interfaces/allergies.interface';

@Component({
  selector: 'app-form-step4',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-step4.component.html',
  styleUrl: './form-step4.component.scss',
})
export class FormStep4Component {
  @Output() submitForm: EventEmitter<any> = new EventEmitter();
  @Output() prevStepForm: EventEmitter<any> = new EventEmitter();
  @Input() form!: FormData;

  constructor() {}

  nextStep(): void {
    this.submitForm.emit();
  }

  prevStep() {
    this.prevStepForm.emit();
  }
}
