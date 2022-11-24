import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss'],
})
export class PlayerlistComponent implements OnInit {

  @Input() ply: Player;
  @Output() onEdit = new EventEmitter(); // event edit
  @Output() onDelete = new EventEmitter(); // event delete
  constructor() { }

  ngOnInit() {}

  onEditClick() {
    this.onEdit.emit(this.ply);
  }

  onDeleteClick() {
    this.onDelete.emit(this.ply);
  }

}
