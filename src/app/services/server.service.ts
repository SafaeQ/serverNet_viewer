import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Server, Site } from '../interfaces/server.modal';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private serversSubject: BehaviorSubject<Server[]> = new BehaviorSubject<
    Server[]
  >([]);
  servers$: Observable<Server[]> = this.serversSubject.asObservable();
  searchForm: FormGroup | undefined;
  filteredServers: Server[] = [];
  filteredSites: Site[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {
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

  addSiteToServer(serverId: number, newSite: Site): void {
    const currentServers = this.serversSubject.value;
    const updatedServers = currentServers.map((server) => {
      if (server.id === serverId) {
        const updatedSites = [...server.sites, newSite];
        return { ...server, sites: updatedSites };
      }
      return server;
    });
    this.serversSubject.next(updatedServers);
    this.updateLocalStorage(updatedServers);
  }

  deleteSiteFromServer(serverId: number, siteId: number): void {
    const currentServers = this.serversSubject.value;
    const updatedServers = currentServers.map((server) => {
      if (server.id === serverId) {
        const updatedSites = server.sites.filter((site) => site.id !== siteId);
        return { ...server, sites: updatedSites };
      }
      return server;
    });
    this.serversSubject.next(updatedServers);
    this.updateLocalStorage(updatedServers);
  }

}
