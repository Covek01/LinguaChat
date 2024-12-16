import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Language } from "src/models/language.types";
import { servicesPaths } from "./config/services-paths.config";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
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
  
  getLanguagesUserIsLearning(id: number): Observable<Language[]> {
    return this.http.get<Language[]>(
      `${this.baseAddress}/${this.basePath}/getLanguagesUserIsLearning/${id}`
    );
  }

  addLanguage(name: string): Observable<string> {
    return this.http.post<string>(
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
    return this.http.delete<string>(
      `${this.baseAddress}/${this.basePath}/delete/${id}`
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
