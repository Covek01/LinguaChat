import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language } from 'src/models/language.types';
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

  updateInfo(user: UserGetDto): Observable<UserGetDto> {
    return this.http.put<UserGetDto>(
      `${this.baseAddress}/user/updateInfo`,
      user
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

  getUsersWhoAreBlockedByUser(id: number): Observable<UserGetDto[]> {
    return this.http.get<UserGetDto[]>(
      `${this.baseAddress}/user/getUsersWhoAreBlockedByUser/${id}`
    );
  }
  
  getNativeLanguagesForUser(id: number): Observable<Language[]> {
    return this.http.get<Language[]>(
      `${this.baseAddress}/user/getNativeLanguagesForUser/${id}`
    );
  }
  
  getLanguagesUserIsLearning(id: number): Observable<Language[]> {
    return this.http.get<Language[]>(
      `${this.baseAddress}/user/getLanguagesUserIsLearning/${id}`
    );
  }
  

}
