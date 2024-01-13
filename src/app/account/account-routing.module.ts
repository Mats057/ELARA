import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { GeneralComponent } from './general/general.component';
import { SecurityComponent } from './security/security.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [{ path: '', component: AccountComponent, children: [
  { path: '', component: GeneralComponent },
  { path: 'security', component: SecurityComponent },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
