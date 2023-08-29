import { Component, OnInit } from '@angular/core';
import { Server, ServerService } from '../services/server.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
})
export class ServerListComponent implements OnInit {
  constructor(private serverService: ServerService) {}

  servers: Server[] = [];
  newServerName: string = '';
  newServerIP: string = '';

  ngOnInit(): void {
    this.servers = this.serverService.getServers();
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
