import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { HistorycardComponent } from '../../components/historycard/historycard.component';
import { History } from '../../models/allergies.model';
import { history } from '../../../assets/data/DummyData';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [LayoutComponent, HistorycardComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  appName = 'Aller Gus';

  history: History[] = history;

}
