import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FteamsPage } from './fteams.page';

const routes: Routes = [
  {
    path: '',
    component: FteamsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FteamsPageRoutingModule {}
