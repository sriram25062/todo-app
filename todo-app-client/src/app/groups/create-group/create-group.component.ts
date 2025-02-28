import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsService } from '../../_helpers/services/groups.service';

@Component({
  selector: 'app-create-group',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnChanges {
  createGroupForm: FormGroup = new FormGroup({
    GroupName: new FormControl({ value: undefined, disabled: false })
  })

  @Output() groupCreated: EventEmitter<any> = new EventEmitter();

  constructor(
    private groupService: GroupsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("changes", changes);
  }

  async createGroup() {
    let result: any =  await this.groupService.createGroup({ group_name: this.createGroupForm.get("GroupName")?.value });
    if(result.success) {
      this.createGroupForm.reset();
      this.groupCreated.emit(result.result);
      console.info(result.message)
    } else {

    }
  }

}
