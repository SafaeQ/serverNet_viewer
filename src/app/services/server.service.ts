import { Injectable } from '@angular/core';

export interface Site {
  id: number;
  name: string;
  domainName: string;
  ipAddress: string;
  active: boolean;
}

export interface Server {
  id: number;
  name: string;
  ipAddress: string;
  sites: Site[];
}

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor() {}

  private servers: Server[] = [];

  getServers(): Server[] {
    return this.servers;
  }

  addServer(newServer: Server): void {
    this.servers.push(newServer);
  }
}
