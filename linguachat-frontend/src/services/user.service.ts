import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language, LanguageInterface, LanguageWithLearningLevel } from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { servicesPaths } from './config/services-paths.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseAddress: string;
  private basePath: string;

  constructor(private http: HttpClient) {
    this.baseAddress = environment.postgresAddress;
    this.basePath = servicesPaths.user;
  }

  myprofile(): Observable<UserGetDto> {
    return this.http.get<UserGetDto>(
      `${this.baseAddress}/${this.basePath}/myprofile`,
    );
  }

  get(id: number): Observable<UserGetDto> {
    return this.http.get<UserGetDto>(
      `${this.baseAddress}/${this.basePath}/get/${id}`,
    );
  }

  updateInfo(user: UserGetDto): Observable<UserGetDto> {
    console.log(user);
    return this.http.put<UserGetDto>(
      `${this.baseAddress}/${this.basePath}/updateInfo`,
      user
    );
  }

  block(myid: number, id: number): Observable<string> {
    return this.http.post<string>(
      `${this.baseAddress}/${this.basePath}/block/${myid}/${id}`,
      ''
    );
  }

  unblock(myid: number, id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseAddress}/${this.basePath}/unblock/${myid}/${id}`
    );
  }

  getUsersWhoAreBlockedByUser(id: number): Observable<UserGetDto[]> {
    return this.http.get<UserGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getUsersWhoAreBlockedByUser/${id}`
    );
  }

  getUsersWhoAreBlockedByMe(): Observable<UserGetDto[]> {
    return this.http.get<UserGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getUsersWhoAreBlockedByMe`
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseAddress}/${this.basePath}/delete/${id}`
    );
  }

  insertCommentAboutUser(id: number, comment: string): Observable<string> {
    return this.http.put<string>(
      `${this.baseAddress}/${this.basePath}/insertCommentAboutUser`,
      { id, comment }
    );
  }

  insertLanguageNative(userId: number, languageId: number): Observable<LanguageInterface> {
    return this.http.post<LanguageInterface>(
      `${this.baseAddress}/${this.basePath}/insertLanguageNative/${userId}/${languageId}`,
      ''
    );
  }
  removeLanguageNative(userId: number, languageId: number): Observable<string> {
    return this.http.delete(
      `${this.baseAddress}/${this.basePath}/removeLanguageNative/${userId}/${languageId}`,
      {
        responseType: 'text'
      }
    );
  }

  insertLanguageLearning(userId: number, languageId: number, level: string): Observable<LanguageWithLearningLevel> {
    return this.http.post<LanguageWithLearningLevel>(
      `${this.baseAddress}/${this.basePath}/insertLanguageLearning/${userId}/${languageId}/${level}`,
      ''
    );
  }

  removeLanguageLearning(userId: number, languageId: number): Observable<LanguageInterface> {
    return this.http.delete<LanguageInterface>(
      `${this.baseAddress}/${this.basePath}/removeLanguageLearning/${userId}/${languageId}`
    );
  }

  getForProfile(id: number): Observable<UserGetDto> {
    return this.http.get<UserGetDto>(
      `${this.baseAddress}/${this.basePath}/getForProfile/${id}`
    );
  }

}

