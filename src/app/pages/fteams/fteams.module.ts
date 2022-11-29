import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FteamsPageRoutingModule } from './fteams-routing.module';

import { FteamsPage } from './fteams.page';

import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    FteamsPageRoutingModule,
    
  ],
  declarations: [FteamsPage],
})
export class FteamsPageModule {}