import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {

  @Input('message')
  message: string = '';

  hasError = signal(false);

  ngOnInit(): void {
    setTimeout(() => {
      this.hasError.set(true);
    }, 3000);
  }


  closeAlert() {
   this.hasError.set(true);
  }
}
