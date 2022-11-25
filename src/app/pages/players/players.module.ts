import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersPageRoutingModule } from './players-routing.module';

import { PlayersPage } from './players.page';

import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CoreModule,
    PlayersPageRoutingModule,

  ],
  declarations: [PlayersPage]
})
export class PlayersPageModule {}
