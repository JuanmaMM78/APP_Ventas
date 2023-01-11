import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  arrErrors: any[] = [];

  register: FormGroup;

  files: any;

  title: string = '';
  profile: User | any;
  role: string = '';
  path: string = '';

  image: boolean = false;

  stockNow!: number;
  stockInitial!: number;

  name_productError: any;
  originError: any;
  caliberError: any;
  priceError: any;
  stock_initialError: any;
  stock_nowError: any;
  statusError: any;
  imageError: any;

  product!: Product;

  constructor(
    private productsService: ProductsService,
    private profileService: ProfileService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.register = new FormGroup({
      name_product: new FormControl('', []),
      origin: new FormControl('', []),
      caliber: new FormControl('', []),
      price: new FormControl('', []),
      stock_initial: new FormControl('', []),
      stock_now: new FormControl('', []),
      status: new FormControl('', []),
      image: new FormControl('', []),
    });

    this.title = 'Registra Nuevo Producto';
  }

  async ngOnInit(): Promise<void> {
    this.aRouter.params.subscribe(async (params: any) => {
      if (params.idProduct) {
        this.title = 'Actualiza Producto';
        let id = parseInt(params.idProduct);
        let updateProduct = await this.productsService.getProductById(id);
        this.register = new FormGroup({
          id_product: new FormControl(updateProduct.id_product, []),
          name_product: new FormControl(updateProduct.name_product, []),
          origin: new FormControl(updateProduct.origin, []),
          caliber: new FormControl(updateProduct.caliber, []),
          price: new FormControl(updateProduct.price, []),
          stock_initial: new FormControl(updateProduct.stock_initial, []),
          stock_now: new FormControl(updateProduct.stock_initial, []),
          status: new FormControl(updateProduct.status, []),
          image: new FormControl(updateProduct.image, []),
        });
      }
    });

    this.profile = await this.profileService.getProfile();
    this.role = this.profile.userRole;

    if (this.role === 'admin') {
      this.path = '/director/products';
    } else if (this.role === 'master') {
      this.path = '/management/products';
    }
  }
  changeImg($event: any) {
    this.files = $event.target.files;
  }

  selectImage(pImage: any): void {}

  async getDataForm() {
    if (!this.files) {
      this.image = true;
    } else {
      this.image = false;
    }

    let fd = new FormData();

    fd.append('name_product', this.register.value.name_product);
    fd.append('origin', this.register.value.origin);
    fd.append('caliber', this.register.value.caliber);
    fd.append('price', this.register.value.price);
    fd.append('stock_initial', this.register.value.stock_initial);
    fd.append('stock_now', this.register.value.stock_now);
    fd.append('status', this.register.value.status);
    fd.append('image', this.files[0]);

    if (this.register.value.id_product) {
      let response: any = await this.productsService.editProduct(
        fd,
        this.register.value.id_product
      );

      if (response.affectedRows === 1) {
        this.router.navigate([this.path]);
      } else {
        alert('No se actualizó el producto');
      }
    } else {
      try {
        await this.productsService.register(fd);
        this.router.navigate([this.path]);
      } catch (reject: any) {
        this.arrErrors = reject.error;

        this.name_productError = this.arrErrors.find(
          (error) => error.param === 'name_product'
        );

        this.originError = this.arrErrors.find(
          (error) => error.param === 'origin'
        );

        this.caliberError = this.arrErrors.find(
          (error) => error.param === 'caliber'
        );

        this.priceError = this.arrErrors.find(
          (error) => error.param === 'price'
        );

        this.stock_initialError = this.arrErrors.find(
          (error) => error.param === 'stock_initial'
        );

        this.statusError = this.arrErrors.find(
          (error) => error.param === 'status'
        );

        this.imageError = this.arrErrors.find(
          (error) => error.param === 'image'
        );
      }
    }
  }

  // async getDataForm() {
  //   if (this.register.value.id_product) {
  //     let response: any = await this.productsService.editProduct(
  //       this.register.value
  //     );

  //     if (response.affectedRows === 1) {
  //       this.router.navigate([this.path]);
  //     } else {
  //       alert('No se actualizó el producto');
  //     }
  //   } else {
  //     try {
  //       this.stockNow = this.stockInitial;
  //       let response = await this.productsService.register(this.register.value);
  //       if (response) {
  //         this.router.navigate([this.path]);
  //       }
  //     } catch (reject: any) {
  //       this.arrErrors = reject.error;

  //       this.name_productError = this.arrErrors.find(
  //         (error) => error.param === 'name_product'
  //       );

  //       this.originError = this.arrErrors.find(
  //         (error) => error.param === 'origin'
  //       );

  //       this.caliberError = this.arrErrors.find(
  //         (error) => error.param === 'caliber'
  //       );

  //       this.priceError = this.arrErrors.find(
  //         (error) => error.param === 'price'
  //       );

  //       this.stock_initialError = this.arrErrors.find(
  //         (error) => error.param === 'stock_initial'
  //       );

  //       this.statusError = this.arrErrors.find(
  //         (error) => error.param === 'status'
  //       );

  //       this.imageError = this.arrErrors.find(
  //         (error) => error.param === 'image'
  //       );
  //     }
  //   }
  // }
}
