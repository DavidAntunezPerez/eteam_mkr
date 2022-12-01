import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  constructor() { }

  ngOnInit() {}

  onEditClick() {
    this.onEdit.emit(this.tam);
  }

  onDeleteClick() {
    this.onDelete.emit(this.tam);
  }

}
