import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Site } from '../interfaces/server.modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.css'],
})
export class ServerDetailsComponent {
  @Output() siteAdded: EventEmitter<Site> = new EventEmitter<Site>();

  constructor(
    private serverService: ServerService,
    private dialogRef: MatDialogRef<ServerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { serverId: number }
  ) {}

  newSite: Site = {
    id: 0,
    name: '',
    domainName: '',
    ipAddress: '',
    active: true,
  };

  onAddSite(): void {
    const serverId = this.data.serverId;
    if (
      this.newSite.domainName &&
      this.newSite.ipAddress &&
      this.newSite.name
    ) {
      this.serverService.addSiteToServer(serverId, this.newSite); // Pass the server ID
    }
    this.dialogRef.close();
  }

  onCancel(): void {
    this.newSite = {
      id: 0,
      name: '',
      domainName: '',
      ipAddress: '',
      active: true,
    };
    this.dialogRef.close();
  }
}
