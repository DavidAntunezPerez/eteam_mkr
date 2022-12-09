import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'menu.home', url: '/home', icon: 'home' },
    { title: 'menu.players', url: '/players', icon: 'person' },
    { title: 'menu.teams', url: '/teams', icon: 'shield-half' },
    { title: 'menu.rosters', url: '/rosters', icon: 'people-circle' },
    { title: 'menu.fplayers', url: '/favplayers', icon: 'heart' },
    { title: 'menu.fteams', url: '/favteams', icon: 'star' },
    { title: 'menu.about', url: '/about', icon: 'information-circle' },
  ];
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
}
