import { Component, OnInit, Input } from '@angular/core';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { Order } from '../../interfaces/order.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { User } from '../../interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit {
  order: Order | any;
  idClient: Client | any;
  idProduct: Product | any;
  idUser: User | any;
  nameProduct: string = '';
  imgProduct: string = '';

  profile: User | any;
  role: string = '';
  path: string = '';

  constructor(
    private ordersService: OrdersServiceService,
    private clientsService: ClientsService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private profileService: ProfileService,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.aRoute.params.subscribe(async (params: any) => {
      let idOrder = parseInt(params.idOrder);
      let response = await this.ordersService.getOrderById(idOrder);
      this.order = response;

      this.idClient = await this.clientsService.getByIdClients(
        this.order.id_client
      );
      this.idProduct = await this.productsService.getProductById(
        this.order.id_product
      );
   
      this.nameProduct = this.idProduct.name_product;
      this.imgProduct = this.idProduct.image;
     
      this.idUser = await this.usersService.getUserById(this.order.id_user);
    });

    this.profile = await this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'user') {
      this.path = '/seller/orders/';
    } else if (this.role === 'admin') {
      this.path = '/director/orders/';
    } else if (this.role === 'master') {
      this.path = '/management/orders/';
    }
  }
}
