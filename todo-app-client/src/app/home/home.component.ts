import { Component, OnInit } from '@angular/core';
import { CreateGroupComponent } from '../groups/create-group/create-group.component';
import { GroupsComponent } from '../groups/groups.component';
import { TasksComponent } from '../tasks/tasks.component';
import { CreateTaskComponent } from '../tasks/create-task/create-task.component';
import { GroupsService } from '../_helpers/services/groups.service';

@Component({
  selector: 'app-home',
  imports: [GroupsComponent, CreateGroupComponent, TasksComponent, CreateTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  appendGroup: any;
  appendTask: any;
  selGroupId: any;
  
  constructor(
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  emitGroupCreated(data: any) {
    this.appendGroup = data[0];
    console.log(data)
  }

  emitTaskCreated(data: any) {
    this.appendTask = data[0];
    console.log(data)
  }

  emitselectedGroup(data: any) {
    this.selGroupId = data.group_id;
    console.log(data.group_id)
  }
}
