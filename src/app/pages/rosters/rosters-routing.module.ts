import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RostersPage } from './rosters.page';

const routes: Routes = [
  {
    path: '',
    component: RostersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RostersPageRoutingModule {}
