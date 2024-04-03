import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports:[ RouterLink, RouterLinkActive ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    appName = 'Aller Gus';

}
