import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: 'home',
      loadChildren: () => import('./core/pages/home/home.module').then( m => m.HomePageModule)
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'players',
      loadChildren: () => import('./core/pages/players/players.module').then( m => m.PlayersPageModule)
    },
    {
      path: 'teams',
      loadChildren: () => import('./core/pages/teams/teams.module').then( m => m.TeamsPageModule)
    },
    {
      path: 'news',
      loadChildren: () => import('./core/pages/news/news.module').then( m => m.NewsPageModule)
    },
    {
      path: 'favteams',
      loadChildren: () => import('./core/pages/fteams/fteams.module').then( m => m.FteamsPageModule)
    },
    {
      path: 'favplayers',
      loadChildren: () => import('./core/pages/fplayers/fplayers.module').then( m => m.FplayersPageModule)
    },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
