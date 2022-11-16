import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'folder/Home', icon: 'home' },
    { title: 'Players', url: '/folder/Players', icon: 'person' },
    { title: 'Teams', url: '/folder/Teams', icon: 'shield-half' },
    { title: 'Roster News', url: '/folder/News', icon: 'pencil' },
    { title: 'Fav.Players', url: '/folder/Favourite Players', icon: 'heart' },
    { title: 'Fav.Teams', url: '/folder/Favourite Teams', icon: 'star' },
  ];
  constructor() {}
}
