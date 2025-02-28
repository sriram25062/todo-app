import { FormsModule } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TasksService } from '../_helpers/services/tasks.service';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnChanges {
  @Input() appendTask: any;
  @Input() groupId: number | undefined;
  
  taskList: any[] = [];
  
  constructor(
    private taskService: TasksService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("changes", changes);
    if(changes['groupId'] && this.groupId == undefined || changes['groupId']?.currentValue != changes['groupId']?.previousValue) {
      this.getGroupTasks();
    }
    if(changes['appendTask']?.currentValue != undefined) {
      this.taskList.push(changes['appendTask'].currentValue);
      this.appendTask = undefined;
    }
  }

  async getGroupTasks() {
    let param = {
      group_id: this.groupId
    }
    let result: any = await this.taskService.getGroupTasks(param);
    if(result.success) {
      this.taskList = result.result || [];
    } else {

    }
  }

  async updateTask(task: any, idx: number) {
    let param = {
      task_id: task.task_id,
      task_name: task.task_name,
      completed: task.completed
    }
    let result: any = await this.taskService.updateTask(param);
    if(result.success) {
      if(task.completed) {
        this.taskList.splice(idx, 1);
        this.taskList.push(task);
      } else {
        this.taskList.splice(idx, 1);
        this.taskList.unshift(task);
      }
    } else {

    }
  }
  
  async deleteTask(task: any, idx: number) {
    let result: any =  await this.taskService.deleteTask(task.task_id);
    if(result.success) {
      this.taskList.splice(idx, 1);
    } else {

    }
  }
}
