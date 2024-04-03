import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { allergyFacts } from '../../../assets/data/DummyData';

interface allergyFact {
  id: number;
  title: string;
  fact: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  fact!: allergyFact;

  ngOnInit(): void {
    this.fact = this.getFact();
  }

  allergyFacts: Array<allergyFact> | undefined;

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
