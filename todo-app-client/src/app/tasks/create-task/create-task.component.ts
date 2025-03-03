import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../_helpers/services/tasks.service';
import { ToasterService } from '../../_helpers/services/toaster/toaster.service';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup = new FormGroup({
    TaskName: new FormControl({ value: undefined, disabled: false })
  })

  @Input() groupId: number | undefined;
  @Output() taskCreated: EventEmitter<any> = new EventEmitter();

  constructor(
    private tasksService: TasksService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  async createTask() {
    let result: any =  await this.tasksService.createTask({ group_id: this.groupId, task_name: this.createTaskForm.get("TaskName")?.value });
    if(result.success) {
      this.toasterService.show(result.message, 'success');
      this.createTaskForm.reset();
      this.taskCreated.emit(result.result);
    } else {
      this.toasterService.show(result.message, 'danger');
    }
  }
}
