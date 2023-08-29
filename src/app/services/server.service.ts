import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Server } from '../interfaces/server.modal';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private servers: Server[] = [];

  getServers(): Observable<Server[]> {
    const storedData = localStorage.getItem('servers');
    this.servers = storedData ? JSON.parse(storedData) : [];
    return of(this.servers);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('servers', JSON.stringify(this.servers));
  }

  addServer(newServer: Server): Observable<void> {
    this.servers.push(newServer);
    this.updateLocalStorage();
    return of(undefined);
  }
}
