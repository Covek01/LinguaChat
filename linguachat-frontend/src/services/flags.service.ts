import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flag } from 'src/models/models.type';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  constructor(private http: HttpClient) {}

  getFlags(): Observable<Flag[]> {
    return this.http.get<Flag[]>(
      `assets/data/flags-nicknames.json`
    );
  }
}
