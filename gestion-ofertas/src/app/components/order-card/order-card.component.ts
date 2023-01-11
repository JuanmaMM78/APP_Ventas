import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() myOrder: Order | any;

  constructor() {}

  ngOnInit(): void {}
}
