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
