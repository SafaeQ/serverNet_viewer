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
  newServerName: string = '';
  newServerIP: string = '';

  ngOnInit(): void {
    this.servers$ = this.serverService.getServers();
  }

  addServer() {
    const newServer = {
      id: this.servers.length + 1,
      name: this.newServerName,
      ipAddress: this.newServerIP,
      sites: [],
    };

    this.serverService.addServer(newServer);

    this.newServerName = '';
    this.newServerIP = '';
  }
}
