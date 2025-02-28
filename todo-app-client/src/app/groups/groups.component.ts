import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../_helpers/services/auth.service';
import { Router } from '@angular/router';
import { GroupsService } from '../_helpers/services/groups.service';

@Component({
  selector: 'app-groups',
  imports: [],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  @Input() appendGroup: any;
  groupId: number | undefined;
  @Output() selectedGroup = new EventEmitter<any>();

  groupList: any[] = [];

  constructor(
    private authService: AuthService,
    private groupService: GroupsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMyGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['appendGroup'].currentValue != undefined) {
      this.groupList.push(changes['appendGroup'].currentValue);
      this.appendGroup = undefined;
    }
  }

  async getMyGroups() {
    let result: any =  await this.groupService.getMyGroups();
    if(result.success) {
      this.groupList = result.result || [];
      this.selectGroup(this.groupList[0]);
    } else {

    }
  }

  async deleteGroup(group: any, idx: number) {
    let result: any =  await this.groupService.deleteGroup(group.group_id);
    if(result.success) {
      this.groupList.splice(idx, 1);
    } else {

    }
  }

  selectGroup(group: any) {
    this.groupId = group.group_id;
    this.selectedGroup.emit(group);
  }
}
