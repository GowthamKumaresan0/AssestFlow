import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkOrderService, WorkOrder } from '../../services/work-order';

@Component({
  selector: 'app-work-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './work-order-list.html',
})
export class WorkOrderListComponent implements OnInit {
  workOrders: WorkOrder[] = [];
  showModal = false;
  error = '';
  
  newOrder: WorkOrder = {
    title: '',
    description: '',
    status: 'PENDING',
    priority: 'MEDIUM',
    dueDate: new Date().toISOString().split('T')[0]
  };

  constructor(private workOrderService: WorkOrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.workOrderService.getWorkOrders().subscribe({
      next: data => this.workOrders = data,
      error: err => this.error = 'Could not fetch data. Is the backend running?'
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitOrder() {
    this.workOrderService.createWorkOrder(this.newOrder).subscribe({
      next: res => {
        this.workOrders.push(res);
        this.closeModal();
      },
      error: err => this.error = 'Failed to create work order'
    });
  }
}
