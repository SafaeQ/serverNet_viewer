import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Server, Site } from '../interfaces/server.modal';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ServerDetailsComponent } from '../server-details/server-details.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
})
export class ServerListComponent implements OnInit {
  servers$: Observable<Server[]> | undefined;

  searchForm!: FormGroup;
  filteredServers: Server[] = [];
  filteredSites: Site[] = [];
  searchTerm: string = '';

  @ViewChild(ServerDetailsComponent, { static: false })
  addSiteModal: ServerDetailsComponent | undefined;

  constructor(
    private serverService: ServerService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  servers: Server[] = [];
  newServer: Server = { id: 0, name: '', ipAddress: '', sites: [] };

  ngOnInit(): void {
    this.serverService.servers$.subscribe((servers) => {
      this.servers = servers;
      this.filteredServers = this.servers;
      // this.filteredSites = this.servers.flatMap((server) => server.sites);
    });

    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
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
      data: { serverId },
    });
    dialogRef.componentInstance.siteAdded.subscribe((newSite: Site) => {
      this.serverService.addSiteToServer(serverId, newSite);
      dialogRef.close(); // Close the modal
    });
  }

  deleteSite(serverId: number, siteId: number): void {
    this.serverService.deleteSiteFromServer(serverId, siteId);
  }

  filterServersAndSites(): void {
    const searchTerm = this.searchForm.value.searchTerm.toLowerCase();
    this.filteredServers = this.servers.filter(
      (server) =>
        server.name.toLowerCase().includes(searchTerm) ||
        server.ipAddress.includes(searchTerm) ||
        server.sites.filter(
          (site) =>
            site.name.toLowerCase().includes(searchTerm) ||
            site.domainName.toLowerCase().includes(searchTerm) ||
            site.ipAddress.includes(searchTerm)
        )
    );
    // this.filteredSites = this.servers.flatMap((server) =>
    //   server.sites.filter(
    //     (site) =>
    //       site.name.toLowerCase().includes(searchTerm) ||
    //       site.domainName.toLowerCase().includes(searchTerm) ||
    //       site.ipAddress.includes(searchTerm)
    //   )
    // );

    console.log('searchTerm', searchTerm);
  }

  onSearchTermChange(): void {
    return this.filterServersAndSites();
  }
}
