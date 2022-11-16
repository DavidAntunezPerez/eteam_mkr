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
    { title: 'Roster News', url: '/news', icon: 'pencil' },
    { title: 'Fav.Players', url: '/favplayers', icon: 'heart' },
    { title: 'Fav.Teams', url: '/favteams', icon: 'star' },
  ];
  constructor() {}
}
