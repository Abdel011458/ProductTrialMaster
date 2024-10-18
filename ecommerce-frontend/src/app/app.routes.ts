import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from './contact/contact.component';
import {CartComponent} from './cart/cart.component';
import {ProductListComponent} from './products/product-list/product-list.component';
import {NgModule} from '@angular/core';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Redirection par défaut vers la page produits
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
