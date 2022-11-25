import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';

import { CoreModule } from '../../core/core.module';
@NgModule({
  imports: [
    CoreModule,
    NewsPageRoutingModule,
    
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
