import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Players', url: '/folder/players', icon: 'person' },
    { title: 'Teams', url: '/folder/teams', icon: 'shield-half' },
    { title: 'Roster News', url: '/folder/news', icon: 'pencil' },
    { title: 'Fav.Players', url: '/folder/fplayers', icon: 'heart' },
    { title: 'Fav.Teams', url: '/folder/fteams', icon: 'star' },
  ];
  constructor() {}
}
