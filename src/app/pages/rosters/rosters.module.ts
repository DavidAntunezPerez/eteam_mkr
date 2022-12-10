import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RostersPageRoutingModule } from './rosters-routing.module';

import { RostersPage } from './rosters.page';

import { CoreModule } from '../../core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/utils/translate';
import { HttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    CoreModule,
    RostersPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [RostersPage]
})
export class NewsPageModule {}
