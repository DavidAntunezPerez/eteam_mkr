import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Team } from '../../models';

@Component({
  selector: 'app-teamfavlist',
  templateUrl: './teamfavlist.component.html',
  styleUrls: ['./teamfavlist.component.scss'],
})
export class TeamfavlistComponent implements OnInit {
  @Input() tamfav: Team;
  @Output() onUnfav = new EventEmitter(); // event unfav
  constructor(private translateService: TranslateService) {}

  ngOnInit() {}

  onUnfavClick() {
    this.onUnfav.emit(this.tamfav);
  }

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }
}
