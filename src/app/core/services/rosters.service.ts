import * as moment from 'moment-timezone';
import { Injectable } from '@angular/core';
import { Roster } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  private roster: Roster[] = [
    {
      id: 0,
      idPlayer: 0,
      idTeam: 0,
      joinDate: moment().toISOString(),
    },
    {
      id: 1,
      idPlayer: 1,
      idTeam: 2,
      joinDate: moment().toISOString(),
    },
    {
      id: 2,
      idPlayer: 2,
      idTeam: 0,
      joinDate: moment().toISOString(),
    },
    {
      id: 3,
      idPlayer: 3,
      idTeam: 1,
      joinDate: moment().toISOString(),
    },
    {
      id: 3,
      idPlayer: 4,
      idTeam: 1,
      joinDate: moment().toISOString(),
    },
  ];

  private rostersSubject: BehaviorSubject<Roster[]> = new BehaviorSubject(
    this.roster
  );
  public rosters_ = this.rostersSubject.asObservable();

  constructor() {}

  id: number = this.roster.length + 1;

  // METHODS

  getRosters() {
    return this.roster;
  }

  getRosterById(id: number) {
    return this.roster.find((r) => r.id == id);
  }

  getRostersByTaskId(idTeam: number): Roster[] {
    return this.roster.filter((r) => r.idTeam == idTeam);
  }

  getRostersByPersonId(idPlayer: number): Roster[] {
    return this.roster.filter((r) => r.idPlayer == idPlayer);
  }

  deleteRosterById(id: number) {
    this.roster = this.roster.filter((r) => r.id != id);
    this.rostersSubject.next(this.roster);
  }

  addRoster(roster: Roster) {
    roster.id = this.id++;
    this.roster.push(roster);
    this.rostersSubject.next(this.roster);
  }

  updateRoster(roster: Roster) {
    var rst = this.roster.find((r) => r.id == roster.id);
    if (rst) {
      rst.idTeam = roster.idTeam;
      rst.idPlayer = roster.idPlayer;
      rst.joinDate = roster.joinDate;
    }
    this.rostersSubject.next(this.roster);
  }
}
