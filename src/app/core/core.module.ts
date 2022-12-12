import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerDetailComponent, PlayerListComponent , TeamDetailComponent , TeamListComponent, RosterDetailComponent, RosterListComponent, DateShowListComponent, PlayerShowListComponent, TeamShowListComponent, LogTestComponent, LogService, PlayerfavlistComponent  } from 'src/app/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../utils/translate';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent,
    TeamDetailComponent , 
    TeamListComponent,
    RosterDetailComponent,
    RosterListComponent,
    DateShowListComponent,
    PlayerShowListComponent,
    TeamShowListComponent,
    LogTestComponent,
    PlayerfavlistComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PlayerListComponent,
    PlayerDetailComponent,
    TeamDetailComponent, 
    TeamListComponent,
    RosterDetailComponent, 
    RosterListComponent,
    DateShowListComponent,
    PlayerShowListComponent,
    TeamShowListComponent,
    LogTestComponent,
    PlayerfavlistComponent,
  ],
  providers:[
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'es'
    // },
    LogService
  ]
})
export class CoreModule { }