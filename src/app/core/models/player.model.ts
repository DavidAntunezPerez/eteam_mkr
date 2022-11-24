// MODEL FOR PLAYERS
export interface Player {
  id: number;
  name: String;
  surname: String;
  age: number;
  kda: number; // the KDA Ratio is the ratio of number of kills plus assists over deaths ( (K + A) / D)
  role: String; // player role (depending on the game could differ / Example: Jungler, IGL, Smoker, Healer...)
  winratio: number; // the total number of wins divided by the total numbers of losses, could be null if the player is new in the League
  picture?: String; // url picture
}
