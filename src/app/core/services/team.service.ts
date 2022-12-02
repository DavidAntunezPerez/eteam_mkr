import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService{
  team : Team[] = [  
    {
      id: 1,
      name: 'Fnatic',
      tag: 'FNC',
      titles: 'x2 World Championships, x1 Majors',
      coach: 'Jamie "keita" Hal',
      wr: '77.3%',
      picture: 'https://img-cdn.hltv.org/teamlogo/dLtWEdSV58lIX1amAFggy0.svg?ixlib=java-2.1.0&s=f24d0a7b3ef24ed57184a51d35202b4e',
    },
    {
      id: 2,
      name: 'Movistar Riders',
      tag: 'MRDS',
      coach: 'Galder "bladE" Barcena',
      wr: '56.7%',
    },
    {
      id: 3,
      name: 'Ninjas in Pyjamas',
      tag: 'NIP',
      titles: 'x1 Crossfire Cup, x5 Mid Season International',
      coach: 'Sweden Daniel "djL" Narancic',
      wr: '43.2%',
      picture: 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/7e/NIP-Symbol-RGB-Neon_Yellow.svg/1200px-NIP-Symbol-RGB-Neon_Yellow.svg.png'
    },
  ];
  private teamSubject:BehaviorSubject<Team[]> = new BehaviorSubject(this.team);
  public team_ = this.teamSubject.asObservable();

  id: number = this.team.length + 1;

  constructor() {}

  // METHODS

  public getTeam(): Team[] {
    // return team
    return this.team;
  }

  public getTeamById(id: number) {
    // returns team by ID
    return this.team.find((t) => t.id == id);
  }

  deleteTeamById(id: number) {
    // delete team by ID
    this.team = this.team.filter((t) => t.id != id);
    this.teamSubject.next(this.team);
  }

  addTeam(t: Team) {
    // add new team
    t.id = this.id++;
    this.team.push(t);
    this.teamSubject.next(this.team);
  }

  updateTeam(t: Team) {
    // update team information
    var tam = this.team.find((tm) => tm.id == t.id);
    if (tam) {
      tam.name = t.name;
      tam.tag = t.tag;
      tam.titles = t.titles;
      tam.picture = t.picture;
      tam.coach = t.coach;
      tam.wr = t.wr;
    }
    this.teamSubject.next(this.team);
  }
}