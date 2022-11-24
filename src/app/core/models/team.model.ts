// MODEL FOR TEAMS
export interface Team {
  id: number;
  name: String;
  tag: String; // teams must have a short tag to represent it in game (example: FNATIC's tag is FNC)
  titles?: String; // titles won by a team in its history, could be null if they didnt win anything
  coach: String; // all teams must have a coach in a professional league, here goes the coach username in game
  picture?: String; // url picture
}