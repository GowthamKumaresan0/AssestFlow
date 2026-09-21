import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

export interface Asset {
  id?: number;
  name: string;
  serialNumber: string;
  type: string;
  status: string;
  failureProbability?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private apiUrl = `${environment.apiUrl}/assets`;

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    // Return mock data for UI showcase purposes
    return of([
      { id: 1, name: 'Pump Station Alpha', serialNumber: 'SN-001', type: 'PUMP', status: 'ACTIVE', failureProbability: 12.5 },
      { id: 2, name: 'Generator B-12', serialNumber: 'SN-002', type: 'GENERATOR', status: 'IN_MAINTENANCE', failureProbability: 84.2 }
    , { id: 3, name: 'Conveyor Belt C', serialNumber: 'SN-003', type: 'CONVEYOR', status: 'ACTIVE', failureProbability: 45.0 }]);
  }
}