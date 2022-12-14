import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Player } from '../../models';

@Component({
  selector: 'app-playerfavlist',
  templateUrl: './playerfavlist.component.html',
  styleUrls: ['./playerfavlist.component.scss'],
})
export class PlayerfavlistComponent implements OnInit {
  @Input() plyfav: Player;
  @Output() onUnfav = new EventEmitter(); // event unfav
  constructor(private translateService: TranslateService) { }

  ngOnInit() {}

  onUnfavClick() {
    this.onUnfav.emit(this.plyfav);
  }

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }

}
