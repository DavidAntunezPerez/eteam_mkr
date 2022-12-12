import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss'],
})
export class PlayerListComponent implements OnInit {
  @Input() ply: Player;
  @Output() onEdit = new EventEmitter(); // event edit
  @Output() onDelete = new EventEmitter(); // event delete
  @Output() onFav = new EventEmitter(); // event fav
  constructor() { }

  ngOnInit() {}

  onEditClick() {
    this.onEdit.emit(this.ply);
  }

  onDeleteClick() {
    this.onDelete.emit(this.ply);
  }
  onFavClick() {
    this.onFav.emit(this.ply);
  }

}
