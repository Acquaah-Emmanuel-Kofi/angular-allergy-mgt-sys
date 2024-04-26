import { Component, Input } from '@angular/core';
import { History } from '../../interfaces/allergies.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historycard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historycard.component.html',
  styleUrl: './historycard.component.scss',
})
export class HistorycardComponent {
  @Input()
  historyData!: History;
  isdisabled: boolean = false;

  starMsg(id:number) {
    if (this.historyData.favorite) {
      this.historyData.favorite = true;
      this.isdisabled = true;


    } else {
      this.historyData.favorite = true;
    }
   
    
  }
}
