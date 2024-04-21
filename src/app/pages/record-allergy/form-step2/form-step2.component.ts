import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormData } from '../../../interfaces/allergies.interface';

@Component({
  selector: 'app-form-step2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-step2.component.html',
  styleUrl: './form-step2.component.scss',
})
export class FormStep2Component {
  @Output() nextStepForm: EventEmitter<any> = new EventEmitter();
  @Output() prevStepForm: EventEmitter<any> = new EventEmitter();
  @Input() form!: FormData;
  @Input() handleCheckboxChange!: (event: Event) => void;

  constructor() {}

  nextStep(): void {
    this.nextStepForm.emit();
  }

  prevStep() {
    this.prevStepForm.emit();
  }
}
