import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Server, Site } from '../interfaces/server.modal';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ServerDetailsComponent } from '../server-details/server-details.component';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
})
export class ServerListComponent implements OnInit {
  servers$: Observable<Server[]> | undefined;

  @ViewChild(ServerDetailsComponent, { static: false })
  addSiteModal: ServerDetailsComponent | undefined;

  constructor(
    private serverService: ServerService,
    private dialog: MatDialog
  ) {}

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

  addSiteToServerDialog(serverId: number): void {
    const dialogRef = this.dialog.open(ServerDetailsComponent, {
      data: { serverId }, // Pass the serverId as data to the modal
    });
    dialogRef.componentInstance.siteAdded.subscribe((newSite: Site) => {
      this.serverService.addSiteToServer(serverId, newSite);
      dialogRef.close(); // Close the modal
    });
  }
}
