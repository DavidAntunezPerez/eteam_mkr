import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FplayersPage } from './fplayers.page';

const routes: Routes = [
  {
    path: '',
    component: FplayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FplayersPageRoutingModule {}
