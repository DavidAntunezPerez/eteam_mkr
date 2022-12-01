import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RostersPageRoutingModule } from './rosters-routing.module';

import { RostersPage } from './rosters.page';

import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CoreModule,
    RostersPageRoutingModule,
    
  ],
  declarations: [RostersPage]
})
export class NewsPageModule {}
