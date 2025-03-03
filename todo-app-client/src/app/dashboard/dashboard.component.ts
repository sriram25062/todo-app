import { Component } from '@angular/core';
import { AuthService } from '../_helpers/services/auth.service';
import { Router } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { CreateGroupComponent } from '../groups/create-group/create-group.component';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUserInfo();
  }

  getUserInfo() {
    let userInfo = this.authService.getUserInfo();
  }
}
