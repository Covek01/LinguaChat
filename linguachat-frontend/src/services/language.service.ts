import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language, LanguageWithLearningLevel } from 'src/models/language.types';
import { servicesPaths } from './config/services-paths.config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private baseAddress: string;
  private basePath: string;

  constructor(private http: HttpClient) {
    this.baseAddress = environment.postgresAddress;
    this.basePath = servicesPaths.language;
  }

  getNativeLanguagesForUser(id: number): Observable<Language[]> {
    return this.http.get<Language[]>(
      `${this.baseAddress}/${this.basePath}/getNativeLanguagesForUser/${id}`
    );
  }

  getNativeLanguagesForMe(): Observable<Language[]> {
    return this.http.get<Language[]>(
      `${this.baseAddress}/${this.basePath}/getNativeLanguagesForMe`
    );
  }

  getLanguagesUserIsLearning(
    id: number
  ): Observable<LanguageWithLearningLevel[]> {
    return this.http.get<LanguageWithLearningLevel[]>(
      `${this.baseAddress}/${this.basePath}/getLanguagesUserIsLearning/${id}`
    );
  }

  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(
      `${this.baseAddress}/${this.basePath}/getAllLanguages`
    );
  }

  getLanguagesIAmLearning(): Observable<LanguageWithLearningLevel[]> {
    return this.http.get<LanguageWithLearningLevel[]>(
      `${this.baseAddress}/${this.basePath}/getLanguagesIAmLearning`
    );
  }

  addLanguage(name: string): Observable<Language> {
    return this.http.post<Language>(
      `${this.baseAddress}/${this.basePath}/add?name=${name}`,
      {}
    );
  }

  getLanguage(id: number): Observable<Language> {
    return this.http.get<Language>(
      `${this.baseAddress}/${this.basePath}/get/${id}`
    );
  }

  deleteLanguage(id: number): Observable<string> {
    return this.http.delete(
      `${this.baseAddress}/${this.basePath}/delete/${id}`,
      {
        responseType: 'text',
      }
    );
  }

  deleteLanguageByName(name: string): Observable<string> {
    return this.http.delete<string>(
      `${this.baseAddress}/${this.basePath}/deleteByName/${name}`
    );
  }

  updateLanguage(language: Language): Observable<string> {
    return this.http.put<string>(
      `${this.baseAddress}/${this.basePath}/update`,
      language
    );
  }
}
