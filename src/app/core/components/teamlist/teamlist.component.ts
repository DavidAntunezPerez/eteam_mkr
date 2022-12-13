import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Team } from '../../models';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.scss'],
})
export class TeamListComponent implements OnInit {
  @Input() tam: Team;
  @Output() onEdit = new EventEmitter(); // event edit
  @Output() onDelete = new EventEmitter(); // event delete
  @Output() onFav = new EventEmitter(); // event fav
  constructor(private translateService: TranslateService) {}

  ngOnInit() {}

  onEditClick() {
    this.onEdit.emit(this.tam);
  }

  onDeleteClick() {
    this.onDelete.emit(this.tam);
  }

  onFavClick() {
    this.onFav.emit(this.tam);
  }

  language: string = this.translateService.currentLang;
  languageChange() {
    this.translateService.use(this.language);
  }
}
