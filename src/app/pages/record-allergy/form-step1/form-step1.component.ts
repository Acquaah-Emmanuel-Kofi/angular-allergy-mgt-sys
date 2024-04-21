import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormsModule,
} from '@angular/forms';
import { FormData } from '../../../interfaces/allergies.interface';

@Component({
  selector: 'app-form-step1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-step1.component.html',
  styleUrl: './form-step1.component.scss',
})
export class FormStep1Component {
  @Output() nextStepForm: EventEmitter<any> = new EventEmitter();
  @Input() form!: FormData;

  isChecked: boolean = false;

  constructor() {}

  nextStep(): void {
    this.nextStepForm.emit();
  }

  onChangeYes() {
    this.isChecked = true;
  }

  onChangeNo() {
    this.isChecked = false;
  }
}
