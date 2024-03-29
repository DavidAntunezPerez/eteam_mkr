// MODEL FOR TEAMS
export interface Team {
  id: number;
  docId?:string;
  name: String;
  tag: String; // teams must have a short tag to represent it in game (example: FNATIC's tag is FNC)
  titles?: String; // titles won by a team in its history, could be null if they didnt win anything
  coach: String; // all teams must have a coach in a professional league, here goes the coach username in game (coach wont be in players page or in any other page than team information, they are not that relevant for the competition)
  wr: String; // the total number of wins divided by the total numbers of losses (represented as %), could be null if the player is new in the League
  picture?: String; // url picture
  isfav : Boolean; // favourite team option
}