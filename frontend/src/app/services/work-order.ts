import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

export interface WorkOrder {
  id?: number;
  title: string;
  status: string;
  priority: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private apiUrl = `${environment.apiUrl}/workorders`;

  constructor(private http: HttpClient) { }

  getWorkOrders(): Observable<WorkOrder[]> {
    // Mock data for UI showcase
    return of([
      { id: 1, title: 'Inspect Alpha Pump', status: 'IN_PROGRESS', priority: 'HIGH' },
      { id: 2, title: 'Routine Generator check', status: 'PENDING', priority: 'LOW' }
    ]);
  }
}