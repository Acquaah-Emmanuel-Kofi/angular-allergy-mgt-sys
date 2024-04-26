import { Component, Input } from '@angular/core';
import { AllergiesService } from '../../services/data/allergies.service';
import { ActivatedRoute } from '@angular/router';
import { History } from '../../interfaces/allergies.interface';

@Component({
  selector: 'app-historydetails',
  standalone: true,
  imports: [],
  templateUrl: './historydetails.component.html',
  styleUrl: './historydetails.component.scss'
})
export class HistorydetailsComponent {
  @Input()
  historyData!: History;
  // HisStory?: History;

  constructor(private allergyService: AllergiesService, private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.HisStory =this.allergyService.getHistoryDetails(Number(params.get('id'))) ;
    // })
 
  }
}
