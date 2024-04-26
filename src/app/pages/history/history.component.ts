import { Component, OnInit } from '@angular/core';
import { HistorycardComponent } from '../../components/historycard/historycard.component';
import { history } from '../../../assets/data/DummyData';
import { AllergiesService } from '../../services/data/allergies.service';
import { Observable } from 'rxjs';
import { History } from '../../interfaces/allergies.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HistorycardComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  appName = 'Aller Gus';

  // history$!: Observable<History[]>;

  history: History[] = [];

  constructor(private _allergies: AllergiesService, private router: Router) {}

  ngOnInit() {
    this._allergies.getRecordedAllergy().subscribe({
      next: (response: any) => {
        this.history = response.data;
        console.log("History data: ",response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  navigateToHistoryDetails() {
    this.router.navigate(['history/details', this.history[0].id]);
  }

  public getHistoryDetails(id: number): History {
    return this.history.find((history) => history.id === id)!;
  }
}
