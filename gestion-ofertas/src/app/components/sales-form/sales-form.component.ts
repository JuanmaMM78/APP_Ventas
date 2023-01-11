import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client.interface';
import { ClientsService } from '../../services/clients.service';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OrdersServiceService } from '../../services/orders-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss'],
})
export class SalesFormComponent implements OnInit {
  arrClients: Client[] = [];
  arrProducts: Product[] = [];
  arrDirector: User[] = [];
  arrUsers: User[] = [];
  profile: any;
  userId: number = 0;
  dateNow: any = new Date();
  date: string = '';
  arrErrors: any[] = [];

  title: string = '';
  textMail: string = '';
  noMail: string = '';
  status?: string = '';

  path: string = '';
  role: string = '';

  register: FormGroup;

  id_clientError: any;
  id_productError: any;
  vol_saleError: any;
  shippingError: any;
  meth_paymentError: any;
  price_saleError: any;
  statusError: any;
  commentError: any;

  mailDirector: string = '';

  flag: boolean = false;
  flag2: boolean = false;

  constructor(
    private clientService: ClientsService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private profileService: ProfileService,
    private ordersService: OrdersServiceService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.register = new FormGroup({
      id_client: new FormControl('', []),
      id_product: new FormControl('', []),
      vol_sale: new FormControl('', []),
      shipping: new FormControl('', []),
      meth_payment: new FormControl('', []),
      price_sale: new FormControl('', []),
      id_user: new FormControl('', []),
      date_order: new FormControl('', []),
      status: new FormControl('', []),
      comment: new FormControl('', []),
    });

    this.title = 'Registrar Pedidos';
  }

  async ngOnInit(): Promise<void> {
    this.arrClients = await this.clientService.getAllClients();
    this.arrProducts = await this.productsService.getProductsActive();
    this.profile = await this.profileService.getProfile();
    this.role = this.profile.userRole;
    this.noMail = 'nomail@none.non';

    if (this.role === 'user') {
      this.path = '/seller/orders';
    } else if (this.role === 'admin') {
      this.path = '/director/orders';
    } else if (this.role === 'master') {
      this.path = '/management/orders';
    }

    this.userId = this.profile.userId;
    this.date = `${this.dateNow.getFullYear()}-${
      this.dateNow.getMonth() + 1
    }-${this.dateNow.getDate()}`;

    this.aRoute.params.subscribe(async (params: any) => {
      if (params.idOrder) {
        this.title = 'Actualizar Pedido';
        let id = parseInt(params.idOrder);
        let updateOrder = await this.ordersService.getOrderById(id);
        this.status = updateOrder.status;
        this.register = new FormGroup({
          id_order: new FormControl(updateOrder.id_order, []),
          id_client: new FormControl(updateOrder.id_client, []),
          id_product: new FormControl(updateOrder.id_product, []),
          vol_sale: new FormControl(updateOrder.vol_sale, []),
          shipping: new FormControl(updateOrder.shipping, []),
          meth_payment: new FormControl(updateOrder.meth_payment, []),
          price_sale: new FormControl(updateOrder.price_sale, []),
          id_user: new FormControl(updateOrder.id_user, []),
          date_order: new FormControl(this.date, []),
          status: new FormControl(updateOrder.status, []),
          comment: new FormControl(updateOrder.comment, []),
        });
      }
    });

    this.arrUsers = await this.usersService.getAllUsers();

    this.arrUsers.forEach((user) => {
      if (user.role !== 'user') {
        this.arrDirector.push(user);
      }
    });
  }

  // Controla el estado del pedido
  sendMail(pText: any): void {
    this.textMail = pText.target.value;
  }

  // Obtiene el mail del director seleccionado
  selectMailDirector(pMail: any): void {
    this.mailDirector = pMail.target.value;
  }

  async getDataForm() {
    // Controlamos si el pedido llega sin destinatario de mail y asignamos uno vacio
    if (
      (this.status !== 'pendiente' && this.textMail !== 'pendiente') ||
      this.mailDirector.length <= 0
    ) {
      this.mailDirector = 'nomail@none.non';
    }

    if (this.register.value.id_order) {
      try {
        let response = await this.ordersService.editOrder(
          this.register.value,
          this.mailDirector
        );

        if (response.errorStock) {
          this.flag = true;
        } else {
          this.flag = false;
        }

        if (response.errorMail) {
          this.flag2 = true;
        } else {
          this.flag2 = false;
        }

        if (this.mailDirector !== 'nomail@none.non') {
          alert(`Correo enviado a ${this.mailDirector}`);
          this.router.navigate([this.path]);
        }

        if (response.affectedRows === 1) {
          if (this.profile.userRole === 'user') {
            this.router.navigate(['/seller', 'orders']);
          } else if (this.profile.userRole === 'admin') {
            this.router.navigate(['/director', 'orders']);
          } else {
            this.router.navigate(['/management', 'orders']);
          }
        }
      } catch (reject: any) {
        this.arrErrors = reject.error;

        this.id_clientError = this.arrErrors.find(
          (error) => error.param === 'id_client'
        );

        this.id_productError = this.arrErrors.find(
          (error) => error.param === 'id_product'
        );

        this.vol_saleError = this.arrErrors.find(
          (error) => error.param === 'vol_sale'
        );

        this.shippingError = this.arrErrors.find(
          (error) => error.param === 'shipping'
        );

        this.meth_paymentError = this.arrErrors.find(
          (error) => error.param === 'meth_payment'
        );

        this.price_saleError = this.arrErrors.find(
          (error) => error.param === 'price_sale'
        );

        this.statusError = this.arrErrors.find(
          (error) => error.param === 'status'
        );

        this.commentError = this.arrErrors.find(
          (error) => error.param === 'comment'
        );
      }
    } else {
      try {
        let response = await this.ordersService.register(
          this.register.value,
          this.mailDirector
        );

        if (response.errorStock) {
          this.flag = true;
        } else {
          this.flag = false;
        }

        if (response.errorMail) {
          this.flag2 = true;
        } else {
          this.flag2 = false;
        }

        if (response.insertId) {
          alert(`Correo enviado a ${this.mailDirector}`);
          this.router.navigate([this.path]);
        }
      } catch (reject: any) {
        this.arrErrors = reject.error;

        this.id_clientError = this.arrErrors.find(
          (error) => error.param === 'id_client'
        );

        this.id_productError = this.arrErrors.find(
          (error) => error.param === 'id_product'
        );

        this.vol_saleError = this.arrErrors.find(
          (error) => error.param === 'vol_sale'
        );

        this.shippingError = this.arrErrors.find(
          (error) => error.param === 'shipping'
        );

        this.meth_paymentError = this.arrErrors.find(
          (error) => error.param === 'meth_payment'
        );

        this.price_saleError = this.arrErrors.find(
          (error) => error.param === 'price_sale'
        );

        this.statusError = this.arrErrors.find(
          (error) => error.param === 'status'
        );

        this.commentError = this.arrErrors.find(
          (error) => error.param === 'comment'
        );
      }
    }
  }
}
