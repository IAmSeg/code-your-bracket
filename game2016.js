function(round, team1, team2) {
  // -------------------------------------------------------------------------------------------------
  // Algorithm to pick the NCAA March Madness Bracket using the [Code Your Bracket] environment (https://codersbracket.com).
  // Will Johnson
  // 3-14-2016
  //
  // This algorithm will calculate a team's offensive efficiency using widley accepted formulas.
  // It will also calculate predicted turnover %, steal %, block %, and rebound %.
  // -------------------------------------------------------------------------------------------------

  // Various Stats
  // ----------------------------------------------------------------------
  // Possesions = FGA - ORB + TO + (.4 * FTA)
  // Effective Field Goal % (Offensive Efficiency) = (FG + .5 * 3FG) / FGA
  // Turnover % = 100 * (Turnovers / Possessions)
  // Steal % = 100 * (Steals / OppPossesions)
  // Rebounding Efficiency = OffReb / (OffReb + OppDefReb)


  // Weightings for stats
  // Based on Dean Oliver's "Four Factors"
  // --------------------------------------
  // Shooting Efficiency - 40
  // RPI - 20 
  // Win % - 20
  // Turnover Rate - 25
  // Rebounding - 20
  // Free Throw Conversion - 15
  // Steal % - 15
  // Block % - 15
  //---------------------------------------

  // Four Factors
  var shootingEffWeight = 40;
  var turnoverWeight = 25;
  var reboundingWeight = 20;
  var freeThrowWeight = 15;
  // Other Factors
  var stealsWeight = 15;
  var blocksWeight = 15;
  var rpiWeight = 20;
  var winPercWeight = 20;

  // Calculate Various Stats Needed
  var team1OffEff = (team1.field_goals_made + (0.5 * team1.threes_made)) / team1.field_goals_attempted;
  var team1TurnoverRating = team1.turnovers / (team1.field_goals_attempted + (0.44 * team1.free_throws_attempted) + team1.turnovers);
  var team1Rebounding = team1.off_reb / (team1.off_reb + team2.def_reb); // Predicted rebounding against team2
  var team1DefRebounding = team1.def_reb / (team2.off_reb + team1.def_reb);
  var team1Ft = team1.free_throws_made / team1.field_goals_attempted;
  var team1Poss = team1.field_goals_attempted - team1.off_reb + team1.turnovers + (0.44 * team1.free_throws_attempted);


  var team2OffEff = (team2.field_goals_made + (0.5 * team2.threes_made)) / team2.field_goals_attempted;
  var team2TurnoverRating = team2.turnovers / (team2.field_goals_attempted + (0.44 * team2.free_throws_attempted) + team2.turnovers);
  var team2Rebounding = team2.off_reb / (team2.off_reb + team1.def_reb); // Predicted rebounding against team2
  var team2DefRebounding = team2.def_reb / (team1.off_reb + team2.def_reb);
  var team2Ft = team2.free_throws_made / team2.field_goals_attempted;
  var team2Poss = team2.field_goals_attempted - team2.off_reb + team2.turnovers + (0.44 * team2.free_throws_attempted);

  var team1StealPerc = team1.total_steals / team2Poss;
  var team2StealPerc = team2.total_steals / team1Poss;
  var team1Blocks = team1.total_blocks / team2Poss;
  var team2Blocks = team2.total_blocks / team1Poss;

  var team1Total = (team1OffEff * shootingEffWeight);
  team1Total -= (team2OffEff * shootingEffWeight);
  team1Total -= (team1TurnoverRating * turnoverWeight);
  team1Total += (team2TurnoverRating * turnoverWeight);
  team1Total += ((team1Rebounding + team1DefRebounding) / 2 * reboundingWeight);
  team1Total -= ((team2Rebounding + team2DefRebounding) / 2 * reboundingWeight);
  team1Total += (team1Ft * freeThrowWeight);
  team1Total -= (team2Ft * freeThrowWeight);

  team1Total += (team1.rpi * rpiWeight);
  team1Total += (team1.win_pct * winPercWeight);
  team1Total += (team1StealPerc * stealsWeight);
  team1Total += (team1Blocks * blocksWeight);

  var team2Total = (team2OffEff * shootingEffWeight);
  team2Total -= (team1OffEff * shootingEffWeight);
  team2Total -= (team2TurnoverRating * turnoverWeight);
  team2Total += (team1TurnoverRating * turnoverWeight);
  team2Total += ((team2Rebounding + team2DefRebounding) / 2 * reboundingWeight);
  team2Total -= ((team1Rebounding + team1DefRebounding) / 2 * reboundingWeight);
  team2Total += (team2Ft * freeThrowWeight);
  team2Total -= (team1Ft * freeThrowWeight);

  team2Total += (team2.rpi * rpiWeight);
  team2Total += (team2.win_pct * winPercWeight);
  team2Total += (team2StealPerc * stealsWeight);
  team2Total += (team2Blocks * blocksWeight);

  console.log('Team1: ' + team1.name + '. Total: ' + team1Total + ' Off: ' + team1OffEff + ' TO: ' + team1TurnoverRating +
              ' RB: ' + team1Rebounding + ' DRB: ' + team1DefRebounding + ' FT: ' + team1Ft + ' BL: ' + team1Blocks
              + ' ST: ' + team1StealPerc + ' RPI: ' + team1.rpi + ' W%: ' + team1.win_pct);
  console.log('Team2: ' + team2.name + '. Total: ' + team2Total + '. Off: ' + team2OffEff + ' TO: ' + team2TurnoverRating +
              ' RB: ' + team2Rebounding + ' DRB: ' + team2DefRebounding + ' FT: ' + team2Ft + ' BL: ' + team2Blocks
              + ' ST: ' + team2StealPerc + ' RPI: ' + team2.rpi + ' W%: ' + team2.win_pct);

  // Find winner
  if (team1Total > team2Total)
    team1.winsGame();
  else if(team1Total < team2Total)
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
