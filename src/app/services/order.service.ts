import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: IOrder[] = [];

  getOrders(): Observable<IOrder[]> {
    return of(this.orders);
  }

  getOrderById(id: number): Observable<IOrder | undefined> {
    return of(this.orders.find((x) => x.id === id));
  }

  updateOrder(id: number, data: IOrder) {
    const index = this.orders.findIndex((x) => x.id === id);
    if (index >= 0) {
      this.orders[index] = data;
    }
  }

  createOrder(data: IOrder) {
    const id = Date.now();
    this.orders.push({ ...data, id });
  }

  deleteOrder(id: number) {
    const index = this.orders.findIndex((x) => x.id === id);
    if (index >= 0) {
      this.orders.splice(index, 1);
    }
  }
}
