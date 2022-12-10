import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FplayersPageRoutingModule } from './fplayers-routing.module';

import { FplayersPage } from './fplayers.page';

import { CoreModule } from '../../core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/utils/translate';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CoreModule,
    FplayersPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [FplayersPage]
})
export class FplayersPageModule {}
