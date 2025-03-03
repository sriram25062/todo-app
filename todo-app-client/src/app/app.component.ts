import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './_helpers/services/auth.service';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './_helpers/services/toaster/toaster.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, HeaderComponent, CommonModule, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private authService: AuthService
  ) { }

  showHeader() {
    return this.authService.getUserInfo() != null;
  }

}
