// MODEL FOR PLAYERS
export interface Player {
  id: number;
  docId?:string;
  name: String;
  surname: String;
  nick: String; // player in-game nickname
  age: number;
  kda: number; // the KDA Ratio is the ratio of number of kills plus assists over deaths ( (K + A) / D)
  role: String; // player role (depending on the game could differ / Example: Jungler, IGL, Smoker, Healer...)
  picture?: String; // url picture
  isfav : Boolean; // favourite option
}
