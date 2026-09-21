import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
  private mlApiUrl = 'https://assestflow-1.onrender.com/predict';

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    const mockAssets: Asset[] = [
      { id: 1, name: 'Pump Station Alpha', serialNumber: 'SN-001', type: 'PUMP', status: 'ACTIVE' },
      { id: 2, name: 'Generator B-12', serialNumber: 'SN-002', type: 'GENERATOR', status: 'IN_MAINTENANCE' },
      { id: 3, name: 'Conveyor Belt C', serialNumber: 'SN-003', type: 'CONVEYOR', status: 'ACTIVE' },
      { id: 4, name: 'Main Transformer', serialNumber: 'SN-004', type: 'TRANSFORMER', status: 'ACTIVE' }
    ];

    // Mock operational metrics for each asset to send to the ML model
    const mockMetrics = [
      { hours_operated: 1200, days_since_last_maintenance: 150, temperature_celsius: 45, vibration_mm_s: 1.5 },
      { hours_operated: 8000, days_since_last_maintenance: 360, temperature_celsius: 85, vibration_mm_s: 5.8 },
      { hours_operated: 4000, days_since_last_maintenance: 200, temperature_celsius: 60, vibration_mm_s: 2.5 },
      { hours_operated: 100, days_since_last_maintenance: 10, temperature_celsius: 35, vibration_mm_s: 0.5 }
    ];

    // Fetch live predictions from the Render ML service for all mock assets
    const requests = mockAssets.map((asset, index) => {
      return this.http.post<any>(this.mlApiUrl, mockMetrics[index]).pipe(
        map(response => {
          asset.failureProbability = response.failure_probability;
          return asset;
        })
      );
    });

    return forkJoin(requests);
  }
}
