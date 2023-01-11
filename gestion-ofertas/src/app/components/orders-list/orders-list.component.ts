import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../interfaces/user.interface';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from 'src/app/services/clients.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  arrOrders: Order[] = [];
  arrClients: Client[] = [];
  arrProducts: Product[] = [];
  profile: User | any;
  role: string = '';
  path: string = '';
  viewFilter: boolean = false;
  arrDates: string[] = [];
  arrDatesOnly: string[] = [];

  dateNow: any = new Date();

  status : string = '';

  constructor(
    private ordersService: OrdersServiceService,
    private clientsService: ClientsService,
    private productService: ProductsService,
    private profileServices: ProfileService
  ) {}

  async ngOnInit(): Promise<void> {

    let response = await this.ordersService.getAllOrders();
    this.arrOrders = response;

    this.arrOrders.forEach((order) => {
      this.arrDates.push(order.date_order);
    });

    this.arrDatesOnly = this.arrDates.filter((date, index) => {
      return this.arrDates.indexOf(date) === index;
    });

    this.profile = await this.profileServices.getProfile();
    this.role = this.profile.userRole;

    let response2 = await this.clientsService.getAllClients();
    this.arrClients = response2;

    let response3 = await this.productService.getAllProducts();
    this.arrProducts = response3;

    if (this.role === 'user') {
      this.path = '/seller/orders';
      this.viewFilter = false;
    } else if (this.role === 'admin') {
      this.path = '/director/orders';
      this.viewFilter = true;
    } else if (this.role === 'master') {
      this.path = '/management/orders';
      this.viewFilter = true;
    }
  }

  
  resetear(): any {
    this.status = '';
  }    


  async showOrdersByStatus($event: any): Promise<void> {
    if ($event.target.value === 'todos') {
      let response = await this.ordersService.getAllOrders();
      this.arrOrders = response;
    } else {
      let response = await this.ordersService.getOrdersByStatus(
        $event.target.value
      );
      this.arrOrders = response;
    }
  }

  async showOrdersByClients($event: any): Promise<void> {
    if ($event.target.value === '') {
      let response = await this.ordersService.getAllOrders();
      this.arrOrders = response;
    } else {
      let response = await this.ordersService.getOrderByClient(
        $event.target.value
      );
      this.arrOrders = response;
    }
  }

  async showOrdersByProducts($event: any): Promise<void> {
    if ($event.target.value === '') {
      let response = await this.ordersService.getAllOrders();
      this.arrOrders = response;
    } else {
      let response = await this.ordersService.getOrderByProduct(
        $event.target.value
      );
      this.arrOrders = response;
    }
  }

  async showOrdersByDate($event: any): Promise<void> {
    if ($event.target.value === '') {
      let response = await this.ordersService.getAllOrders();
      this.arrOrders = response;
    } else {
      let response = await this.ordersService.getOrderByDate(
        $event.target.value
      );
      this.arrOrders = response;
    }



  }
}
