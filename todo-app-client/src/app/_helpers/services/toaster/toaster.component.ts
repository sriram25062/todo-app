import { Component } from '@angular/core';
import { ToasterService } from './toaster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  toasterTypes: any = {
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
  }
  constructor(public toasterService: ToasterService) {}

  ngonInit() {

  }
}