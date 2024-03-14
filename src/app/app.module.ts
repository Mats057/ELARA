import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { CartCheckoutComponent } from './checkouts/cart-checkout/cart-checkout.component';
import { OneItemComponent } from './checkouts/one-item/one-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './dialogs/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    CartCheckoutComponent,
    OneItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ErrorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
