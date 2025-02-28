import { Component } from '@angular/core';
import { AuthService } from '../_helpers/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    this.authService.logOut();
  }

  onProfile() {
    this.router.navigate(['/profile']);
  }

  onTitle() {
    this.router.navigate(['/home']);
  }
}
