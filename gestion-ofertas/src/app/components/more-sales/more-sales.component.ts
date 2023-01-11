import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ClientsService } from 'src/app/services/clients.service';
import { OrdersServiceService } from '../../services/orders-service.service';
import { ProductsService } from '../../services/products.service';
Chart.register(...registerables);

@Component({
  selector: 'app-more-sales',
  templateUrl: './more-sales.component.html',
  styleUrls: ['./more-sales.component.scss'],
})
export class MoreSalesComponent implements OnInit {
  arrUsers: any[] = [];
  arrNameUsers: string[] = [];
  arrSaleUsers: string[] = [];

  arrProducts: any[] = [];
  arrNameProducts: string[] = [];
  arrVolProducts: string[] = [];

  arrClients: any[] = [];
  arrNameClients: string[] = [];
  arrVolClients: string[] = [];

  constructor(
    private ordersService: OrdersServiceService,
    private productsService: ProductsService,
    private clientsService: ClientsService
  ) {}

  async ngOnInit(): Promise<void> {
    let response = await this.ordersService.getUsersForSales();

    this.arrUsers = response;

    this.arrUsers.forEach((user) => {
      this.arrNameUsers.push(user.name_user);
      this.arrSaleUsers.push(user.vol_price_sale);
    });

    let responseProducts = await this.productsService.getBestProducts();
    this.arrProducts = responseProducts;

    this.arrProducts.forEach((product) => {
      this.arrNameProducts.push(product.name_product);
      this.arrVolProducts.push(product.vol_total_sale);
    });

    let responseClients = await this.clientsService.getBestClients();
    this.arrClients = responseClients;

    this.arrClients.forEach((client) => {
      this.arrNameClients.push(client.name_client);
      this.arrVolClients.push(client.vol_price_sale);
    });

    this.renderChart();
    this.renderChart2();
    this.renderChart3();
  }

  renderChart() {
    const myChart = new Chart('piechart', {
      type: 'bar',
      data: {
        labels: this.arrNameUsers,
        datasets: [
          {
            label: 'Comerciales con mayores ventas',
            data: this.arrSaleUsers,
            backgroundColor: ['rgba(37, 60, 240, 0.4)'],
            borderColor:'blue',
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  renderChart2() {
    const myChart = new Chart('piechart2', {
      type: 'bar',
      data: {
        labels: this.arrNameProducts,

        datasets: [
          {
            label: 'Productos con mayores ventas',
            data: this.arrVolProducts,
            backgroundColor: ['rgba(232, 100, 100, 0.4)'],
            borderColor: 'red',
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  renderChart3() {
    const myChart = new Chart('piechart3', {
      type: 'bar',
      data: {
        labels: this.arrNameClients,

        datasets: [
          {
            label: 'Clientes con mayores compras',
            data: this.arrVolClients,
            backgroundColor: ['rgba(26, 139, 43, 0.4)'],
            borderColor: 'green',
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
