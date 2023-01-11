import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProfileService } from 'src/app/services/profile.service';
import { ProductsService } from 'src/app/services/products.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() myProduct: Product | any;
  profile: User | any;
  role: string = '';
  path: string = '';
  product: Product[] = [];
 

  arrProducts: Product[] = [];

  constructor(
    private profileService: ProfileService,
    private productsService: ProductsService
  ) {}

  async ngOnInit(): Promise<void> {
    let response = await this.productsService.getAllProducts();
    this.arrProducts = response;

    this.profile = this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'admin') {
      this.path = '/director/';
    } else if (this.role === 'master') {
      this.path = '/management/';
    }
  }
}
