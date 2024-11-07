import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserGetDto } from 'src/models/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseAddress: string;

  constructor(private http: HttpClient) { 
    this.baseAddress = environment.postgresAddress;
  }

  myprofile(): Observable<UserGetDto> {
    return this.http.get<UserGetDto>(
      `${this.baseAddress}/user/myprofile`,
    )
  }

  get(id: number): Observable<UserGetDto> {
    return this.http.get<UserGetDto>(
      `${this.baseAddress}/user/get/${id}`,
    )
  }

  block(myid: number, id: number): Observable<string> {
    return this.http.post(
      `${this.baseAddress}/user/block/${myid}/${id}`,
      '',
      {
        responseType: 'text',
      }
    )
  }

  unblock(myid: number, id: number): Observable<string> {
    return this.http.post(
      `${this.baseAddress}/user/block/${myid}/${id}`,
      '',
      {
        responseType: 'text',
      }
    )
  }

}
