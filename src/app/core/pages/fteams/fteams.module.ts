import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FteamsPageRoutingModule } from './fteams-routing.module';

import { FteamsPage } from './fteams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FteamsPageRoutingModule
  ],
  declarations: [FteamsPage]
})
export class FteamsPageModule {}
