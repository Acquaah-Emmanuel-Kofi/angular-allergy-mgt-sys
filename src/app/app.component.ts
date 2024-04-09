import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { LayoutComponent } from './components/layout/layout.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const authRoutes = ['/login', '/register']; 
    const currentRoute = this.router.url;
    return authRoutes.includes(currentRoute) || currentRoute === '/';
  }
  
  ngOnInit(): void {
    initFlowbite();
  }
}
