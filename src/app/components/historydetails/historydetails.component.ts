import { Component, OnInit } from '@angular/core';
import { AllergiesService } from '../../services/data/allergies.service';
import { ActivatedRoute } from '@angular/router';
import { History } from '../../interfaces/allergies.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historydetails.component.html',
  styleUrls: ['./historydetails.component.scss'],
  providers: [AllergiesService],
})
export class HistorydetailsComponent implements OnInit {
  historyData: History[] = [];
  history: History | null = null; 
  itemId?: string;
  itemData?: History;

  constructor(private _allergies: AllergiesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
  
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.getData();
    });
  }

  getData() {
    this._allergies.getALlergyDetails(this.itemId).subscribe(data => {
      this.itemData = data;
    });
  }
}