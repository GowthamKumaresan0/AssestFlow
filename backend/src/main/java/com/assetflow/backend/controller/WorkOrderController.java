package com.assetflow.backend.controller;

import com.assetflow.backend.model.WorkOrder;
import com.assetflow.backend.service.WorkOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/workorders")
public class WorkOrderController {
    @Autowired
    private WorkOrderService workOrderService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('ENGINEER')")
    public List<WorkOrder> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('ENGINEER')")
    public ResponseEntity<WorkOrder> getWorkOrderById(@PathVariable Long id) {
        return workOrderService.getWorkOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public WorkOrder createWorkOrder(@RequestBody WorkOrder workOrder) {
        return workOrderService.saveWorkOrder(workOrder);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('ENGINEER')")
    public ResponseEntity<WorkOrder> updateWorkOrder(@PathVariable Long id, @RequestBody WorkOrder workOrderDetails) {
        return workOrderService.getWorkOrderById(id).map(workOrder -> {
            workOrder.setTitle(workOrderDetails.getTitle());
            workOrder.setDescription(workOrderDetails.getDescription());
            workOrder.setStatus(workOrderDetails.getStatus());
            workOrder.setPriority(workOrderDetails.getPriority());
            workOrder.setDueDate(workOrderDetails.getDueDate());
            // Optionally update assignedTo based on role check, etc.
            return ResponseEntity.ok(workOrderService.saveWorkOrder(workOrder));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteWorkOrder(@PathVariable Long id) {
        return workOrderService.getWorkOrderById(id).map(workOrder -> {
            workOrderService.deleteWorkOrder(id);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}