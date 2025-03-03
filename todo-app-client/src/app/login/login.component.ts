import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../_helpers/services/auth.service';
import { ToasterService } from '../_helpers/services/toaster/toaster.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    Email: new FormControl({ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.email])),
    Password: new FormControl({ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.logOut();

  }

  async loginUser() {
    let param = {
      email: this.loginForm.get("Email")?.value,
      password: this.loginForm.get("Password")?.value,
    }
    let result: any = await this.authService.loginUser(param);
    if(result.success) {
      this.toasterService.show(result.message, 'success');
      localStorage.setItem("token", result.token);
      this.router.navigate(['home']);
    } else {
      this.toasterService.show(result.message, 'danger');
    }
  }
}
