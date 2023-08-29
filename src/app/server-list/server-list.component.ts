import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Server } from '../interfaces/server.modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
})
export class ServerListComponent implements OnInit {
  servers$: Observable<Server[]> | undefined;

  constructor(private serverService: ServerService) {}

  servers: Server[] = [];
  newServer: Server = { id: 0, name: '', ipAddress: '', sites: [] };

  ngOnInit(): void {
    this.serverService.servers$.subscribe((servers) => {
      this.servers = servers;
    });
  }

  addServer(): void {
    this.serverService.addServer(this.newServer);
    this.newServer = { id: 0, name: '', ipAddress: '', sites: [] };
  }

  deleteServer(serverId: number): void {
    this.serverService.deleteServer(serverId);
  }
}
