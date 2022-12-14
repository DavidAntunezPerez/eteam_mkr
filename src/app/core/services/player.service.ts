import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private player: Player[] = [
    {
      id: 1,
      name: 'Oleksandr',
      surname: 'Kostyliev',
      nick: 's1mple',
      age: 25,
      kda: 1.25,
      role: 'Rifler',
      picture:
        'https://img-cdn.hltv.org/playerbodyshot/Q2u6AgnDNYQ3dyObwN4JBX.png?ixlib=java-2.1.0&w=400&s=5e19fa63867872bd78409f6e757ff6c3',
      isfav: true,
    },
    {
      id: 2,
      name: 'Kenny',
      surname: 'Schrub',
      nick: 'KennyS',
      age: 27,
      kda: 0.98,
      role: 'Awper',
      picture:
        'https://img-cdn.hltv.org/playerbodyshot/Ff2gUR7tQRW-6_nkTfxZdu.png?ixlib=java-2.1.0&w=400&s=f090fb981261e3c5516606d3b0139b41',
      isfav: false,
    },
    {
      id: 3,
      name: 'Patrik',
      surname: 'Lindberg',
      nick: 'f0rest',
      age: 34,
      kda: 0.77,
      role: 'IGL & Support',
      isfav: false,
    },
    {
      id: 4,
      name: 'Oscar',
      surname: 'Cañellas',
      nick: 'm1xwell',
      age: 26,
      kda: 1.5,
      role: 'Awper & IGL',
      picture:
        'https://img-cdn.hltv.org/playerbodyshot/TFAU5GadOux7ZMV8XCTQwY.png?ixlib=java-2.1.0&w=400&s=8ff7347bb305f218b9cfed4999e2b6f0',
      isfav: true,
    },
    {
      id: 5,
      name: 'Tarik',
      surname: 'Celik',
      nick: 'tarik',
      age: 25,
      kda: 1.13,
      role: 'Flasher',
      isfav: false,
    },
  ];
  private playerSubject: BehaviorSubject<Player[]> = new BehaviorSubject(
    this.player
  );
  public playerOsb = this.playerSubject.asObservable();

  id: number = this.player.length + 1;
  constructor() {}

  // METHODS

  public getPlayer(): Player[] {
    // return player
    return this.player;
  }

  public getPlayerById(id: number) {
    // returns player by ID
    return this.player.find((ply) => ply.id == id);
  }

  public getPlayerByFav(fav: boolean){
    // returns player assigned as favourite
    return this.player.find((ply) => ply.isfav = true);
  }

  public getPlayerSpecificFav(): Player[]{
    // filter player by favourite
    let x = this.player.filter((ply) => {
      return ply.isfav == true;
    });
    return x;
  }

  public getPlayerByAge(age: number) {
    // returns player by age
    return this.player.find((ply) => ply.age == age);
  }

  public getPlayerSpecificAge(): Player[]{
    // filter player by age
    let x = this.player.filter((ply) => {
      return ply.age == 25;
    });
    return x;
  }

  deletePlayerById(id: number) {
    // delete player by ID
    this.player = this.player.filter((ply) => ply.id != id);
    this.playerSubject.next(this.player);
  }

  addPlayer(ply: Player) {
    // adds a new player
    this.id++;
    ply.id = this.id;
    this.player.push(ply);
    this.playerSubject.next(this.player);
  }

  updatePlayer(ply: Player) {
    // update player information
    var playr = this.player.find((p) => p.id == ply.id);
    if (playr) {
      playr.name = ply.name;
      playr.surname = ply.surname;
      playr.nick = ply.nick;
      playr.age = ply.age;
      playr.picture = ply.picture;
      playr.kda = ply.kda;
      playr.role = ply.role;
      this.playerSubject.next(this.player);
    }
  }

  // REMOVE PLAYER FROM FAVOURITE PAGE
  deleteFavPlayer(play: Player){
    play.isfav = false
  }

  addFavPlayer(play:Player){
    play.isfav = true
  }
}
