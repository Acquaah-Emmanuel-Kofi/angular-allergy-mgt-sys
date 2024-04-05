import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports:[ RouterLink, RouterLinkActive, ToasterComponent ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    appName = 'Aller Gus';

}
