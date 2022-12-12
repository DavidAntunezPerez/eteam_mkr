import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'app-playerfavlist',
  templateUrl: './playerfavlist.component.html',
  styleUrls: ['./playerfavlist.component.scss'],
})
export class PlayerfavlistComponent implements OnInit {
  @Input() plyfav: Player;
  @Output() onUnfav = new EventEmitter(); // event unfav
  constructor() { }

  ngOnInit() {}

  onUnfavClick() {
    this.onUnfav.emit(this.plyfav);
  }

}
