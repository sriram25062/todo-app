import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  toasts: any[] = [];
  
  constructor() { }

  show(message: string, type: string, icon?: string) {
    this.toasts.push({ message, type, icon });
    setTimeout(() => {
      this.remove(this.toasts[0]);
    }, 1800);
  }
  
  remove(toast: any) {
    this.toasts.splice(this.toasts.indexOf(toast), 1);
  }
}
