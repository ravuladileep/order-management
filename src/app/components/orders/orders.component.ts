import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  bsModalRef?: BsModalRef;

  orderList: IOrder[] = [];

  constructor(
    private orderService: OrderService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe((res) => {
      this.orderList = res;
    });
  }

  openModal(val?: number): void {
    const initialState = { id: val };
    this.bsModalRef = this.modalService.show(OrderDetailsComponent, {
      class: 'modal-lg custom-modal-content',
      initialState,
    });
  }

  deleteOrder(id: number): void {
    Swal.fire({
      icon: 'warning',
      title: '<h5>Are you sure want to delete this order?<h5>',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id);
        Swal.fire('Done', '<h5>Order deleted Successfully<h5>', 'success');
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('order-mgt-value');
    this.router.navigate(['/login']);
  }
}
