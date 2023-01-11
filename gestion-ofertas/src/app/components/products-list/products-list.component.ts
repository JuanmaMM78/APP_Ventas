import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  arrProducts: Product[] = [];
  profile: User | any;
  role: string = '';
  path: string = '';
  viewButton: boolean = false;

  constructor(
    private productsService: ProductsService,
    private profileService: ProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    let response = await this.productsService.getAllProducts();
    this.arrProducts = response;

    this.profile = await this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'admin') {
      this.path = '/director/';
      this.viewButton = true;
    } else if (this.role === 'master') {
      this.path = '/management/';
      this.viewButton = true;
    }
  }

  async showProducts($event: any): Promise<void> {
    if ($event.target.value === 'Todos') {
      this.arrProducts = await this.productsService.getAllProducts();
    } else if ($event.target.value === 'Stock') {
      let response = await this.productsService.getProductsActive();
      this.arrProducts = response;
    } else if ($event.target.value === 'No Stock') {
      let response = await this.productsService.getProductsInactive();
      this.arrProducts = response;
    }
  }
}
