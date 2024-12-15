import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private baseAddress: string;

  constructor(private http: HttpClient) { 
    this.baseAddress = environment.postgresAddress;
  }
}
