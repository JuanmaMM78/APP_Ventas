import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { C404Component } from './components/c404/c404.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { SellerComponent } from './components/seller/seller.component';
import { DirectorComponent } from './components/director/director.component';
import { ManagementComponent } from './components/management/management.component';
import { SalesFormComponent } from './components/sales-form/sales-form.component';
import { LoginGuard } from './guards/login.guard';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { AdminGuard } from './guards/admin.guard';
import { SellerGuard } from './guards/seller.guard';
import { MasterGuard } from './guards/master.guard';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';

import { ProductsFormComponent } from './components/products-form/products-form.component';
import { GeneralEmployeesComponent } from './components/general-employees/general-employees.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MoreSalesComponent } from './components/more-sales/more-sales.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'seller',
    component: SellerComponent,
    canActivate: [LoginGuard, SellerGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      { path: 'form', component: SalesFormComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'new', component: ClientsFormComponent },
      { path: 'update/:idClient', component: ClientsFormComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:idOrder', component: OrderViewComponent },
      { path: 'orders/update/:idOrder', component: SalesFormComponent },
    ],
  },
  {
    path: 'director',
    component: DirectorComponent,
    canActivate: [LoginGuard, AdminGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'products', component: ProductsListComponent },
      { path: 'newProduct', component: ProductsFormComponent },
      { path: 'updateProduct/:idProduct', component: ProductsFormComponent },
      {
        path: 'generalEmployees',
        component: GeneralEmployeesComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'registerUser' },
          { path: 'registerUser', component: UsersFormComponent },
          { path: 'updateUser/:idUser', component: UsersFormComponent },
          { path: 'usersList', component: UsersListComponent },
          { path: 'moreSales', component: MoreSalesComponent },
        ],
      },
      { path: 'form', component: SalesFormComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'new', component: ClientsFormComponent },
      { path: 'update/:idClient', component: ClientsFormComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:idOrder', component: OrderViewComponent },
      { path: 'orders/update/:idOrder', component: SalesFormComponent },
    ],
  },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [LoginGuard, MasterGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'products', component: ProductsListComponent },
      { path: 'newProduct', component: ProductsFormComponent },
      { path: 'updateProduct/:idProduct', component: ProductsFormComponent },
      {
        path: 'generalEmployees',
        component: GeneralEmployeesComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'registerUser' },
          { path: 'registerUser', component: UsersFormComponent },
          { path: 'updateUser/:idUser', component: UsersFormComponent },
          { path: 'usersList', component: UsersListComponent },
          { path: 'moreSales', component: MoreSalesComponent },
        ],
      },
      { path: 'form', component: SalesFormComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'new', component: ClientsFormComponent },
      { path: 'update/:idClient', component: ClientsFormComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:idOrder', component: OrderViewComponent },
      { path: 'orders/update/:idOrder', component: SalesFormComponent },
    ],
  },
  { path: 'passwords', component: PasswordsComponent },
  { path: '**', component: C404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
