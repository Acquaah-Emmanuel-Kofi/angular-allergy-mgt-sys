import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { allergyFacts } from '../../../assets/data/DummyData';
import { AllergyFact } from '../../models/allergies.model';
import { RecenthistorycardComponent } from '../../components/recenthistorycard/recenthistorycard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent, RecenthistorycardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  fact!: AllergyFact;

  ngOnInit(): void {
    this.fact = this.getFact();
  }

  allergyFacts: AllergyFact[] = allergyFacts;

  navigateToView(): void {
    this.router.navigate(['/record-allergy']);
  }
  
  greetUser() {   
    const currentTime = new Date();
    const hours = currentTime.getHours();
    let greeting = 'Good ';
    
    if (hours < 12) {
        greeting += 'morning, ';
    } else if (hours < 18) {
        greeting += 'afternoon, ';
    } else {
        greeting += 'evening, ';
    }

    return greeting;
  }


  getFact() {

    let randomFact = Math.floor(Math.random() * allergyFacts.length - 1);

    let fact = allergyFacts[randomFact];

    return fact;    
  }


}
