import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  domain: string = environment.domain + '/api';
  tokenKey: string = 'token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async getMyGroups() {
    return await lastValueFrom(this.http.get(this.domain + '/groups/own-list'));
  }

  async createGroup(param: any) {
    return await lastValueFrom(this.http.post(this.domain + '/groups/create', param));
  }

  async deleteGroup(group_id: number) {
    return await lastValueFrom(this.http.delete(this.domain + '/groups/' + group_id));
  }
}
