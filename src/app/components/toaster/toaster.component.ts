import { Component } from '@angular/core';
import { ToasterService } from './services/toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent {
  constructor(public toaster: ToasterService) {}
}
