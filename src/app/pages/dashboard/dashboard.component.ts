import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allergyFacts } from '../../../assets/data/DummyData';
import { RecenthistorycardComponent } from '../../components/recenthistorycard/recenthistorycard.component';
import { AllergyFact } from '../../interfaces/allergies.interface';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RecenthistorycardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthenticationService) {}

  // Retrieve username from token
  username = this._authService.getUserDeatils()?.username;

  randomFact_1 = this.getFact();
  randomFact_2 = this.getFact();

  ngOnInit(): void {
    this.randomFact_1 = this.getFact();
    this.randomFact_2 = this.getFact();
  }

  allergyFacts: AllergyFact[] = allergyFacts;

  recordAllergy(): void {
    this._router.navigate(['/record-allergy']);
  }

  // Method to return a greeting to the user depending on the current time.
  greetUser() {
    const currentTime: Date = new Date();
    const hours: number = currentTime.getHours();
    let greeting: string = 'Good ';

    if (hours < 12) {
      greeting += 'morning, ';
    } else if (hours < 18) {
      greeting += 'afternoon, ';
    } else {
      greeting += 'evening, ';
    }

    return greeting;
  }

  getFact() {
    return allergyFacts[this.getRandomFactIndex()];
  }

  // Generate a random index number to get an allergy fact.
  getRandomFactIndex() {
    let randomFact: number = Math.floor(Math.random() * allergyFacts.length);
    return randomFact;
  }
}
