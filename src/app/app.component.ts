import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Players', url: '/players', icon: 'person' },
    { title: 'Teams', url: '/teams', icon: 'shield-half' },
    { title: 'Rosters', url: '/rosters', icon: 'people-circle' },
    { title: 'Fav.Players', url: '/favplayers', icon: 'heart' },
    { title: 'Fav.Teams', url: '/favteams', icon: 'star' },
  ];
  constructor() {}
}
