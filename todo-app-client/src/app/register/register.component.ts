import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_helpers/services/auth.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToasterService } from '../_helpers/services/toaster/toaster.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    Email: new FormControl({ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.email])),
    FullName: new FormControl({ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.minLength(3)])),
    Mobile: new FormControl({ value: undefined, disabled: false }, Validators.compose([Validators.minLength(10)])),
    Password: new FormControl({ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.minLength(6)])),
    ConfirmPassword: new FormControl({ value: undefined, disabled: false }, Validators.compose([Validators.required, Validators.minLength(6), this.matchValues('Password')])),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async registerUser() {
    let param = {
      email: this.userForm.get("Email")?.value ,
      full_name: this.userForm.get("FullName")?.value ,
      mobile: this.userForm.get("Mobile")?.value ,
      password: this.userForm.get("Password")?.value ,
    }
    let result: any = await this.authService.registerUser(param);
    if(result.success) {
      this.toasterService.show(result.message, 'success');
      this.router.navigate(['login']);
    } else {
      this.toasterService.show(result.message, 'danger');
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null; // If the control is not yet part of a form group
      }
      const matchControl = control.parent.get(matchTo);
      
      if (matchControl && control.value !== matchControl.value) {
        return { mismatch: true };
      }
      
      return null;
    };
  }
}
