import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerDetailComponent, PlayerListComponent , TeamDetailComponent , TeamListComponent } from 'src/app/core';
@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent,
    TeamDetailComponent , 
    TeamListComponent,
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
  ],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
  ]
})
export class CoreModule { }