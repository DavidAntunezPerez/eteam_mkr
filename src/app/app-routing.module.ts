import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'players',
    loadChildren: () =>
      import('./pages/players/players.module').then((m) => m.PlayersPageModule),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./pages/teams/teams.module').then((m) => m.TeamsPageModule),
  },
  {
    path: 'rosters',
    loadChildren: () =>
      import('./pages/rosters/rosters.module').then((m) => m.NewsPageModule),
  },
  {
    path: 'favteams',
    loadChildren: () =>
      import('./pages/fteams/fteams.module').then((m) => m.FteamsPageModule),
  },
  {
    path: 'favplayers',
    loadChildren: () =>
      import('./pages/fplayers/fplayers.module').then(
        (m) => m.FplayersPageModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
