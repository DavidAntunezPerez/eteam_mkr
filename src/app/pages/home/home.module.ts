import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
