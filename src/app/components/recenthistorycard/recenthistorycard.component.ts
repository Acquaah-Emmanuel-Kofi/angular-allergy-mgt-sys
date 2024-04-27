import { Component, OnInit } from '@angular/core';
import { AllergiesService } from '../../services/data/allergies.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recenthistorycard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recenthistorycard.component.html',
  styleUrl: './recenthistorycard.component.scss',
  providers: [AllergiesService],
})
export class RecenthistorycardComponent implements OnInit {
  historyData: any;

  constructor(private allergiesService: AllergiesService, private router: Router) {}

  ngOnInit(): void {
    this.allergiesService.getRecordedAllergy().subscribe({
      next: (response: any) => {
        this.historyData = response.data.reverse().slice(0, 3);
      }
    });
  }

  navigateToHistoryDetails(id: number) {
    this.router.navigate(['history/details', id]);
  }

  trackById(index: number, item: any): string {
    return item.id;
  }
}