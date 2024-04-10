import { Component, Input } from '@angular/core';
import { History } from '../../interfaces/allergies.interface';

@Component({
  selector: 'app-historycard',
  standalone: true,
  imports: [],
  templateUrl: './historycard.component.html',
  styleUrl: './historycard.component.scss',
})
export class HistorycardComponent {
  @Input()
  historyData!: History;
}
