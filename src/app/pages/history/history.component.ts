import { Component, OnInit } from '@angular/core';
import { History } from '../../interfaces/allergies.interface';
import { AllergiesService } from '../../services/data/allergies.service';
import { HistorycardComponent } from '../../components/historycard/historycard.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HistorycardComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  appName = 'Aller Gus';
  history: History[] = [];
  showStarredOnly = false;

  constructor(private _allergies: AllergiesService) {}

  ngOnInit() {
    this._allergies.getRecordedAllergy().subscribe({
      next: (response: any) => {
        this.history = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterStarredHistory() {
    this.showStarredOnly = !this.showStarredOnly;
    if (this.showStarredOnly) {
      this.history = this.history.filter((item) => item.favorite === true);
    } else {
      this._allergies.getRecordedAllergy().subscribe({
        next: (response: any) => {
          this.history = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteItem(id: number) {
    this.history = this.history.filter((item) => item.id !== id);
  }

  
}