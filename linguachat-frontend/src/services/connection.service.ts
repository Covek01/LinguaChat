import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConnectionGetDto, ConnectionWithoutId, CreateConnectionDto } from 'src/models/connection.types';
import { servicesPaths } from './config/services-paths.config';
import { UserGetDto } from 'src/models/user.types';
import { DoubleIds } from 'src/models/models.type';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private baseAddress: string;
  private basePath: string;

  constructor(private http: HttpClient) {
    this.baseAddress = environment.postgresAddress;
    this.basePath = servicesPaths.connection; // Assuming the base path for connection
  }

  addConnection(firstUserId: number, secondUserId: number): Observable<ConnectionWithoutId> {
    return this.http.post<ConnectionWithoutId>(
      `${this.baseAddress}/${this.basePath}/add/${firstUserId}/${secondUserId}`,
      {}
    );
  }

  getConnection(id: number): Observable<ConnectionGetDto> {
    return this.http.get<ConnectionGetDto>(
      `${this.baseAddress}/${this.basePath}/get/${id}`
    );
  }

  deleteConnection(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseAddress}/${this.basePath}/delete/${id}`
    );
  }

  deleteConnectionBetweenUsers(firstId: number, secondId: number): Observable<DoubleIds> {
    return this.http.delete<DoubleIds>(
      `${this.baseAddress}/${this.basePath}/delete/${firstId}/${secondId}`
    );
  }

  getConnectionsOfUser(id: number): Observable<ConnectionGetDto[]> {
    return this.http.get<ConnectionGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getConnectionsOfUser/${id}`
    );
  }

  getConnectedUsersOfUser(id: number): Observable<UserGetDto[]> {
    return this.http.get<UserGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getConnectedUsersOfUser/${id}`
  );
  }

  getConnectedUsersOfMe(): Observable<UserGetDto[]> {
    return this.http.get<UserGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getConnectedUsersOfMe`
    );
  }
}
