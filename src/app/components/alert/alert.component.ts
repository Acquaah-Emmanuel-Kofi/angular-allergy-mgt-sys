import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input('message')
  message: string = '';

  hasError = signal(false);

  closeAlert() {
   this.hasError.set(true);
  }
}
