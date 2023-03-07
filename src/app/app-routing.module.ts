import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
    // if the user is not logged in, will be redirected to page login
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
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./pages/teams/teams.module').then((m) => m.TeamsPageModule),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'rosters',
    loadChildren: () =>
      import('./pages/rosters/rosters.module').then((m) => m.NewsPageModule),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'favteams',
    loadChildren: () =>
      import('./pages/fteams/fteams.module').then((m) => m.FteamsPageModule),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'favplayers',
    loadChildren: () =>
      import('./pages/fplayers/fplayers.module').then(
        (m) => m.FplayersPageModule
      ),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutPageModule),
      // no need to redirectunauthorized, just an information page
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
