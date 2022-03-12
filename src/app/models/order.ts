export interface IOrder {
  id?: number;
  customerName: string;
  orderNumber: number;
  dueDate: Date;
  phone: number;
  address: string;
  total: number;
}
