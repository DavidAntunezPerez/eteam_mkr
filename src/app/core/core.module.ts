import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FplayersPage, FteamsPage, NewsPage, PlayersPage, TeamsPage, HomePage } from './pages';



@NgModule({
  declarations: [
    PlayersPage,
    NewsPage,
    HomePage,
    FplayersPage,
    FteamsPage,
    TeamsPage,
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
    PlayersPage,
    NewsPage,
    HomePage,
    FplayersPage,
    FteamsPage,
    TeamsPage,
  ],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
  ]
})
export class CoreModule { }