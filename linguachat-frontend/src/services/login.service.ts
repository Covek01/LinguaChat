import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInsertDto } from 'src/models/user.types';
import { JwtToken } from 'src/models/utility.types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseAddress: string;

  constructor(private http: HttpClient) { 
    this.baseAddress = environment.postgresAddress;
  }

  login(username: string, password: string): Observable<any> {
    const loginBody = {
      username: username,
      password: password
    }
    return this.http.post<any>(
      `${this.baseAddress}/auth/login`,
      loginBody,
      {
        withCredentials: true
      }
    )
  }

  logout(): Observable<string> {
    return this.http.delete(
      `${this.baseAddress}/auth/logout`,
      {
        withCredentials: true,
        responseType: 'text',
      }
    )
  }

  signup(user: UserInsertDto): Observable<string> {
    return this.http.post(
      `${this.baseAddress}/auth/register`,
      user,
      {
        responseType: 'text',
      }
    )
  }
}
