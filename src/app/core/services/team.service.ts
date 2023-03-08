import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { BehaviorSubject } from 'rxjs';
import { DocumentData } from "firebase/firestore";
import { FileUploaded, FirebaseService } from "./firebase/firebase-service";

@Injectable({
  providedIn: 'root',
})
export class TeamService{

  private _teamList: Team[] = [];

  private _team:BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  public team$ = this._team.asObservable();

  public addedteam:Team|undefined;

  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) {
    this.unsubscr = this.firebase.subscribeToCollection('teams',this._team, this.mapTeam);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapTeam(doc:DocumentData){
    return {
      id:0,
      docId:doc["id"],
      name:doc["data"]().name,
      tag:doc["data"]().tag,
      titles:doc["data"]().titles,
      coach:doc["data"]().coach,
      wr:doc["data"]().wr,
      picture:doc["data"]().picture,
      isFav:doc["data"]().isFav,
    };
  }

  getTeamList(){
    return this._team.value;
  }

  async addTeam(team:Team){
    var _team = {
      docId:team.id,
      name:team.name,
      tag:team.tag,
      titles:team.titles,
      coach:team.coach,
      wr:team.wr,
      picture:team.picture,
      isFav: team.isfav
    };
    // if(team['pictureFile']){
    //   var response = await this.uploadImage(team['pictureFile']);
    //   _team['image'] = response.image;
    // }
    try {
      await this.firebase.createDocument('teams', _team);  
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

  getTeamById(id:string):Promise<Team>{
    return new Promise<Team>(async (resolve, reject)=>{
      try {
        var team = (await this.firebase.getDocument('teams', id));
        resolve({
          id:0,
          docId:team.id,
          name:team.data["name"],
          tag:team.data["tag"],
          titles:team.data["titles"],
          coach:team.data["coach"],
          wr:team.data["wr"],
          picture:team.data["picture"],
          isfav:team.data["isfav"]
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async updateTeam(team:Team){
    var _team = {
      docId:team.docId,
      name:team.name,
      tag:team.tag,
      titles:team.titles,
      coach:team.coach,
      wr:team.wr,
      picture:team.picture,
      isFav: team.isfav
    };
    // if(team['pictureFile']){
    //   var response:FileUploaded = await this.uploadImage(team['pictureFile']);
    //   _team['image'] = response.file;
    // }
    try {
      await this.firebase.updateDocument('teams', _team.docId!, _team);  
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTeam(team:Team){
    await this.firebase.deleteDocument('teams', team.docId!);
  }

  async writeToFile(){
    var dataToText = JSON.stringify(this._team.value);
    var data = new Blob([dataToText], {type: 'text/plain'});
    this.firebase.fileUpload(data, 'text/plain', 'teams', '.txt');
  }


  // FAVOURITE SYSTEM

  async addFavTeam(team: Team){
    var _team = {
      docId:team.docId,
      isFav: true
    }
    try {
      await this.firebase.updateDocument('teams', _team.docId!, _team);  
    } catch (error) {
      console.log(error);
    }
  }

  // // REMOVE TEAM FROM FAVOURITE PAGE
  async deleteFavTeam(team: Team){
    var _team = {
      docId:team.docId,
      isFav: false
    }
    try {
      await this.firebase.updateDocument('teams', _team.docId!, _team);  
    } catch (error) {
      console.log(error);
    }
  }

  public getTeamSpecificFav(): Team[]{
    // filter team by favourite
    let x = this._team.value.filter((tam) => {
      return tam.isfav == true;
    });
    return x;
  }



  // team : Team[] = [ 
  //   {
  //     id: 1,
  //     name: 'Fnatic',
  //     tag: 'FNC',
  //     titles: 'x2 World Championships, x1 Majors',
  //     coach: 'Jamie "keita" Hal',
  //     wr: '77.3%',
  //     picture: 'https://img-cdn.hltv.org/teamlogo/dLtWEdSV58lIX1amAFggy0.svg?ixlib=java-2.1.0&s=f24d0a7b3ef24ed57184a51d35202b4e',
  //     isfav: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Movistar Riders',
  //     tag: 'MRDS',
  //     coach: 'Galder "bladE" Barcena',
  //     wr: '56.7%',
  //     isfav:false,
  //   },
  //   {
  //     id: 3,
  //     name: 'Ninjas in Pyjamas',
  //     tag: 'NIP',
  //     titles: 'x1 Crossfire Cup, x5 Mid Season International',
  //     coach: 'Sweden Daniel "djL" Narancic',
  //     wr: '43.2%',
  //     picture: 'https://upload.wikimedia.org/wikipedia/fr/thumb/7/7e/NIP-Symbol-RGB-Neon_Yellow.svg/1200px-NIP-Symbol-RGB-Neon_Yellow.svg.png',
  //     isfav:true,
  //   },
  // ];
  // private teamSubject:BehaviorSubject<Team[]> = new BehaviorSubject(this.team);
  // public team_ = this.teamSubject.asObservable();

  // id: number = this.team.length + 1;

  // constructor() {}

  // // METHODS

  // public getTeam(): Team[] {
  //   // return team
  //   return this.team;
  // }

  // public getTeamById(id: number) {
  //   // returns team by ID
  //   return this.team.find((t) => t.id == id);
  // }

  // deleteTeamById(id: number) {
  //   // delete team by ID
  //   this.team = this.team.filter((t) => t.id != id);
  //   this.teamSubject.next(this.team);
  // }

  // addTeam(t: Team) {
  //   // add new team
  //   t.id = this.id++;
  //   this.team.push(t);
  //   this.teamSubject.next(this.team);
  // }

  // updateTeam(t: Team) {
  //   // update team information
  //   var tam = this.team.find((tm) => tm.id == t.id);
  //   if (tam) {
  //     tam.name = t.name;
  //     tam.tag = t.tag;
  //     tam.titles = t.titles;
  //     tam.picture = t.picture;
  //     tam.coach = t.coach;
  //     tam.wr = t.wr;
  //   }
  //   this.teamSubject.next(this.team);
  // }

  // public getTeamByFav(fav: boolean){
  //   // returns team assigned as favourite
  //   return this.team.find((tam) => tam.isfav = true);
  // }

  // public getTeamSpecificFav(): Team[]{
  //   // filter team by favourite
  //   let x = this.team.filter((tam) => {
  //     return tam.isfav == true;
  //   });
  //   return x;
  // }

  // // REMOVE TEAM FROM FAVOURITE PAGE
  // deleteFavTeam(tam: Team){
  //   tam.isfav = false
  // }

  // // ADD PLAYER TO FAVOURITES PAGE
  // addFavTeam(tam:Team){
  //   tam.isfav = true
  // }
}