import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Server } from '../interfaces/server.modal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private serversSubject: BehaviorSubject<Server[]> = new BehaviorSubject<
    Server[]
  >([]);
  servers$: Observable<Server[]> = this.serversSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchServers();
  }

  private fetchServers(): void {
    this.http
      .get<Server[]>(
        'https://angular-test042023.s3.eu-west-3.amazonaws.com/data-servers.json'
      )
      .subscribe((servers) => {
        this.serversSubject.next(servers);
        localStorage.setItem('servers', JSON.stringify(servers));
      });
  }

  addServer(newServer: Server): void {
    const currentServers = this.serversSubject.value;
    const updatedServers = [...currentServers, newServer];
    this.serversSubject.next(updatedServers);
    this.updateLocalStorage(updatedServers);
  }

  deleteServer(serverId: number): void {
    const currentServers = this.serversSubject.value;
    const updatedServers = currentServers.filter(
      (server) => server.id !== serverId
    );
    this.serversSubject.next(updatedServers);
    this.updateLocalStorage(updatedServers);
  }

  private updateLocalStorage(servers: Server[]): void {
    localStorage.setItem('servers', JSON.stringify(servers));
  }
}
