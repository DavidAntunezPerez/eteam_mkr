import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'app-playerfavlist',
  templateUrl: './playerfavlist.component.html',
  styleUrls: ['./playerfavlist.component.scss'],
})
export class PlayerfavlistComponent implements OnInit {
  @Input() plyfav: Player;
  @Output() onDelete = new EventEmitter(); // event delete fav
  constructor() { }

  ngOnInit() {}

  onDeleteClick() {
    this.onDelete.emit(this.plyfav);
  }

}
