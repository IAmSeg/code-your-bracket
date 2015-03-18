function(round, team1, team2){
  // -------------------------------------------------------------------------------------------------  
  // Algorithm to pick the NCAA March Madness Bracket using the [Code Your Bracket] environment (https://codersbracket.com).
  // Will Johnson
  // 3-17-2015
  // 
  // This algorithm will calculate a team's offensive efficiency using widley accepted formulas.
  // It will also calculate turnover %, steal %, and rebound %.
  // There is almost no way to calculate defensive efficiency of a team due to having no data 
  //   about a team's opponents.
  // Other factors, such as randomness, seed position, rank will be taken into account later, based
  //   on my personal beliefs and feelings as a sports fan. 
  // -------------------------------------------------------------------------------------------------
  
  // Various Stats 
  // ----------------------------------------------------------------------
  // Possesions = FGA - ORB + TO + (.4 * FTA)
  // Effective Field Goal % (Offensive Efficiency) = (FG + .5 * 3FG) / FGA 
  // Turnover % = 100 * (Turnovers / Possessions)
  // Steal % = 100 * (Steals / OppPossesions)
  // Rebounding Efficiency = OffReb / (OffReb + OppDefReb)


  // Weightings for stats
  // -----------------------------
  // Shooting Efficiency - 10
  // RPI - 8
  // Win % - 7
  // Turnover Rate - 5.5
  // Rebounding - 4.5
  // Free Throw Conversion - 2.5

  // Calculate Various Stats Needed 
  // var team1TotalPoints = (3 * team1.threes_made) + (2 * team1.field_goals_made) + (1 * team1.free_throws_made);
  var team1Poss = team1.field_goals_attempted - team1.off_reb + team1.turnovers + (.4 * team1.free_throws_attempted);
  var team1Rebounding = 100 * team1.off_reb / (team1.off_reb + team2.def_reb);

  // var team2TotalPoints = (3 * team2.threes_made) + (2 * team2.field_goals_made) + (1 * team2.free_throws_made);
  var team2Poss = team2.field_goals_attempted - team2.off_reb + team2.turnovers + (.4 * team2.free_throws_attempted); 
  var team2Rebounding = 100 * team2.off_reb / (team2.off_reb + team1.def_reb);

  var team1OffEff = 100 * (team1.field_goals_made + (.5 * team1.threes_made)) / team1.field_goals_attempted;
  var team1TurnoverPerc = 100 * (team1.turnovers / team1Poss);
  var team1StealPerc = 100 * (team1.total_steals / team2Poss);

  var team2OffEff = 100 * (team2.field_goals_made + (.5 * team2.threes_made)) / team2.field_goals_attempted;
  var team2TurnoverPerc = 100 * (team2.turnovers / team2Poss);
  var team2StealPerc = 100 * (team2.total_steals / team1Poss);


  var team1Value = (team1OffEff * 10) + (team1.rpi * 100 * 8) + (team1.win_pct * 100 * 7) - 
                   (team1TurnoverPerc * 5.5) + (team1Rebounding * 4.5) + (team1.free_throw_pct * 2.5);
  var team2Value = (team2OffEff * 10) + (team2.rpi * 100 * 8) + (team2.win_pct * 100 * 7) - 
                   (team2TurnoverPerc * 5.5) + (team2Rebounding * 4.5) + (team2.free_throw_pct * 2.5); 
 
  // For debug 
  console.log('Team1: ' + team1.name + ' offensive: ' + team1OffEff + ' turnover: ' + team1TurnoverPerc +
              ' rebounding: ' + team1Rebounding + ' steal: ' + team1StealPerc + ' total: ' + team1Value);
  console.log('Team2: ' + team2.name + ' offensive: ' + team2OffEff + ' turnover: ' + team2TurnoverPerc + 
              ' rebounding: ' + team2Rebounding +' steal: ' + team2StealPerc + ' total: ' + team2Value);
 
  //console.log('Round ' + game.round + ' team1: ' + team1.name + ' ' + team1Value);
  //console.log('Round ' + game.round + ' team2: ' + team2.name + ' ' + team2Value);


  // Find winner
  if(team1Value > team2Value)
    team1.winsGame();
  else if(team1Value < team2Value)
    team2.winsGame();
  else { // score is even
   
    // Flip a coin
    // Math.random() returns a random number between 0 inclusive and 1 exclusive
    var rand = Math.random();
    if(rand < 0.5)
      team1.winsGame();
    else
      team2.winsGame();

  }
}
