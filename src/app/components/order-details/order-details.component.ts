import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  id: number;

  form: FormGroup;

  data: IOrder;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private modalService: BsModalService
  ) {
    this.orderForm();
  }

  ngOnInit(): void {
    if (this.id) {
      this.getOrderDetails();
    }
  }

  private orderForm(): void {
    this.form = this.fb.group({
      id: [''],
      customerName: ['', Validators.required],
      orderNumber: ['', Validators.required],
      dueDate: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      address: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  private getOrderDetails() {
    this.orderService.getOrderById(this.id).subscribe((res) => {
      this.data = res;
      this.form.patchValue(this.data);
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.id) {
      this.orderService.updateOrder(this.id, this.form.value);
      Swal.fire('Done', '<h5>Order Updated Successfully<h5>', 'success');
    } else {
      this.orderService.createOrder(this.form.value);
      Swal.fire('Done', '<h5>Order Created Successfully<h5>', 'success');
    }
    this.form.reset();
    this.modalService.hide();
  }

  hideModal() {
    this.modalService.hide();
  }
}
