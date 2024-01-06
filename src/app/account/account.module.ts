import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { GeneralComponent } from './general/general.component';
import { SecurityComponent } from './security/security.component';



@NgModule({
  declarations: [
    AccountComponent,
    GeneralComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
