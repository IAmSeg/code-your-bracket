# CodeYourBracket

Algorithm to pick the NCAA March Madness Bracket using the [Code Your Bracket] environment (https://codersbracket.com).
  
This algorithm will calculate a team's offensive efficiency using widley accepted formulas.
It will also calculate turnover %, steal %, and rebound %.
There is almost no way to calculate defensive efficiency of a team due to having no data 
  about a team's opponents.
Other factors, such as randomness, seed position, rank will be taken into account later, based
  on my personal beliefs and feelings as a sports fan. 
  
### Various Stats 
----------------------------------------------------------------------
* Possesions = FGA - ORB + TO + (.4 * FTA)
* Effective Field Goal % (Offensive Efficiency) = (FG + .5 * 3FG) / FGA 
* Turnover % = 100 * (Turnovers / Possessions)
* Steal % = 100 * (Steals / OppPossesions)
* Rebounding Efficiency = OffReb / (OffReb + OppDefReb)


### Weightings for stats
-----------------------------
* Shooting Efficiency - 10
* RPI - 8
* Win % - 7
* Turnover Rate - 5.5
* Rebounding - 4.5
* Free Throw Conversion - 2.5
