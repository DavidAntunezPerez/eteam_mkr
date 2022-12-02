import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerDetailComponent, PlayerListComponent , TeamDetailComponent , TeamListComponent, RosterDetailComponent, RosterListComponent, DateShowListComponent } from 'src/app/core';

@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent,
    TeamDetailComponent , 
    TeamListComponent,
    RosterDetailComponent,
    RosterListComponent,
    DateShowListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule
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
  ],
  providers:[
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'es'
    // },
  ]
})
export class CoreModule { }