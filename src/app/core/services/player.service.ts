import { Injectable } from "@angular/core";
import { DocumentData } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { Player } from "../models/player.model";
import { FileUploaded, FirebaseService } from "./firebase/firebase-service";

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  
  private _playerList: Player[] = [];

  private _player:BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  public player$ = this._player.asObservable();

  public addedplayer:Player|undefined;

  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('players',this._player, this.mapPlayer);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapPlayer(doc:DocumentData){
    return {
      id:0,
      docId:doc["id"],
      name:doc["data"]().name,
      surname:doc["data"]().surname,
      nick:doc["data"]().nick,
      kda:doc["data"]().kda,
      age:doc["data"]().age,
      role:doc["data"]().role,
      picture:doc["data"]().picture,
      isFav:doc["data"]().isFav,
    };
  }

  getPlayerList(){
    return this._player.value;
  }

  async addPlayer(player:Player){
    var _player = {
      docId:player.id,
      name:player.name,
      surname:player.surname,
      nick:player.nick,
      kda:player.kda,
      age:player.age,
      role:player.role,
      picture:player.picture,
      isFav: player.isfav
    };
    // if(player['pictureFile']){
    //   var response = await this.uploadImage(player['pictureFile']);
    //   _player['image'] = response.image;
    // }
    try {
      await this.firebase.createDocument('players', _player);  
    } catch (error) {
      console.log(error);
    }
  }

  // uploadImage(file):Promise<any>{  
  //   return new Promise(async (resolve, reject)=>{
  //     try {
  //       const data = await this.firebase.imageUpload(file);  
  //       resolve(data);
  //     } catch (error) {
  //       resolve(error);
  //     }
  //   });
  // }

  getPlayerById(id:string):Promise<Player>{
    return new Promise<Player>(async (resolve, reject)=>{
      try {
        var player = (await this.firebase.getDocument('playeres', id));
        resolve({
          id:0,
          docId:player.id,
          name:player.data["name"],
          surname:player.data["surname"],
          nick:player.data["nick"],
          age:player.data["age"],
          kda:player.data["kda"],
          role:player.data["role"],
          picture:player.data["picture"],
          isfav:player.data["isfav"]
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async updatePlayer(player:Player){
    var _player = {
      docId:player.docId,
      name:player.name,
      surname:player.surname,
      nick:player.nick,
      kda:player.kda,
      age:player.age,
      role:player.role,
      picture:player.picture,
      isFav: player.isfav
    };

    // if(player['pictureFile']){
    //   var response:FileUploaded = await this.uploadImage(player['pictureFile']);
    //   _player['image'] = response.file;
    // }
    try {
      await this.firebase.updateDocument('players', _player.docId!, _player);  
    } catch (error) {
      console.log(error);
    }
  }

  async deletePlayer(player:Player){
    await this.firebase.deleteDocument('players', player.docId!);
  }

  async writeToFile(){
    var dataToText = JSON.stringify(this._player.value);
    var data = new Blob([dataToText], {type: 'text/plain'});
    this.firebase.fileUpload(data, 'text/plain', 'playeres', '.txt');
  }

  // FAV SYSTEM

  async addFavPlayer(player: Player){
    var _player = {
      docId:player.docId,
      isFav: true
    }
    try {
      await this.firebase.updateDocument('players', _player.docId!, _player);  
    } catch (error) {
      console.log(error);
    }
  }

  // // REMOVE PLAYER FROM FAVOURITE PAGE
  async deleteFavPlayer(player: Player){
    var _player = {
      docId:player.docId,
      isFav: false
    }
    try {
      await this.firebase.updateDocument('players', _player.docId!, _player);  
    } catch (error) {
      console.log(error);
    }
  }

  public getPlayerSpecificFav(): Player[]{
    // filter player by favourite
    let x = this._player.value.filter((ply) => {
      return ply.isfav == true;
    });
    return x;
  }

  

  // private playerSubject: BehaviorSubject<Player[]> = new BehaviorSubject(
  //   this.player
  // );
  // public playerOsb = this.playerSubject.asObservable();

  // id: number = this.player.length + 1;
  // constructor() {}

  // // METHODS

  // public getPlayer(): Player[] {
  //   // return player
  //   return this.player;
  // }

  // public getPlayerById(id: number) {
  //   // returns player by ID
  //   return this.player.find((ply) => ply.id == id);
  // }


  // deletePlayerById(id: number) {
  //   // delete player by ID
  //   this.player = this.player.filter((ply) => ply.id != id);
  //   this.playerSubject.next(this.player);
  // }

  // addPlayer(ply: Player) {
  //   // adds a new player
  //   this.id++;
  //   ply.id = this.id;
  //   this.player.push(ply);
  //   this.playerSubject.next(this.player);
  // }

  // updatePlayer(ply: Player) {
  //   // update player information
  //   var playr = this.player.find((p) => p.id == ply.id);
  //   if (playr) {
  //     playr.name = ply.name;
  //     playr.surname = ply.surname;
  //     playr.nick = ply.nick;
  //     playr.age = ply.age;
  //     playr.picture = ply.picture;
  //     playr.kda = ply.kda;
  //     playr.role = ply.role;
  //     this.playerSubject.next(this.player);
  //   }
  // }

  // public getPlayerSpecificFav(): Player[]{
  //   // filter player by favourite
  //   let x = this.player.filter((ply) => {
  //     return ply.isfav == true;
  //   });
  //   return x;
  // }

  // // REMOVE PLAYER FROM FAVOURITE PAGE
  // deleteFavPlayer(play: Player){
  //   play.isfav = false
  // }

  // addFavPlayer(play:Player){
  //   play.isfav = true
  // }
}
