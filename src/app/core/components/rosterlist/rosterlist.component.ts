import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Roster, Player, Team } from '../../models';
import { RosterService, PlayerService, TeamService } from '../../services';
@Component({
  selector: 'app-rosterlist',
  templateUrl: './rosterlist.component.html',
  styleUrls: ['./rosterlist.component.scss'],
})
export class RosterListComponent implements OnInit {
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input() roster: Roster;
  constructor(
    private playerSvc: PlayerService,
    private teamSvc: TeamService,
    private rosterSvc: RosterService
  ) {}

  ngOnInit() {}

  // METHODS
  getTeam():Team{
    var idTeam = this.roster.idTeam;
    if(idTeam)
      return this.teamSvc.getTeamById(idTeam)!;
    return undefined!;
  }

  getPlayer():Player{
    var playerId = this.roster.idPlayer;
    if(playerId)
      return this.playerSvc.getPlayerById(playerId)!;
    return undefined!;
  }

  onEditClick(){
    this.onEdit.emit(this.roster);
  }

  onDeleteClick(){
    this.onDelete.emit(this.roster);
  }

}
