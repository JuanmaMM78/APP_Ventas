import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { C404Component } from './components/c404/c404.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PasswordsComponent } from './components/passwords/passwords.component';
import { SellerComponent } from './components/seller/seller.component';
import { DirectorComponent } from './components/director/director.component';
import { ManagementComponent } from './components/management/management.component';
import { SalesFormComponent } from './components/sales-form/sales-form.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { GeneralEmployeesComponent } from './components/general-employees/general-employees.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MoreSalesComponent } from './components/more-sales/more-sales.component';
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    C404Component,
    ProductsListComponent,
    ProductCardComponent,
    PasswordsComponent,
    SellerComponent,
    DirectorComponent,
    ManagementComponent,
    SalesFormComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrderCardComponent,
    OrderViewComponent,
    DashboardComponent,
    ClientsComponent,
    ClientsFormComponent,
    ProductsFormComponent,
    GeneralEmployeesComponent,
    UsersListComponent,
    MoreSalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
