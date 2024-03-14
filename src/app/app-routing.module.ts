import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartCheckoutComponent } from './checkouts/cart-checkout/cart-checkout.component';
import { authGuard } from './guards/auth.guard';
import { cartGuard } from './guards/cart.guard';
import { OneItemComponent } from './checkouts/one-item/one-item.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: 'cart', component: CartCheckoutComponent, canActivate: [authGuard, cartGuard]},
  { path: 'checkout', component: OneItemComponent, canActivate: [authGuard]},
  { path: 'checkout/:id', component: OneItemComponent, canActivate: [authGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
