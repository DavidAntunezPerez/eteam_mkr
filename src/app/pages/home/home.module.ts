import { NgModule } from '@angular/core';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { CoreModule } from '../../core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/utils/translate';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CoreModule,
    HomePageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
