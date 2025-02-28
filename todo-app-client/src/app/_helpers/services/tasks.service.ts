import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  domain: string = environment.domain + '/api';
    tokenKey: string = 'token';
  
    constructor(
      private http: HttpClient,
      private router: Router
    ) { }
  
    async getGroupTasks(param: any) {
      return await lastValueFrom(this.http.post(this.domain + '/group/tasks', param));
    }
  
    async createTask(param: any) {
      return await lastValueFrom(this.http.post(this.domain + '/group/tasks/create', param));
    }
  
    async updateTask(param: any) {
      return await lastValueFrom(this.http.post(this.domain + '/group/tasks/update', param));
    }

    async deleteTask(task_id: number) {
      return await lastValueFrom(this.http.delete(this.domain + '/group/tasks/' + task_id));
    }
}
