function displayHero(hero) {
  if ((hero.team == "Avengers" || hero.team == "S.H.I.E.L.D.") &&
    hero.universe == "Marvel" && hero.race == "human" &&
    hero.eyeColor == "green" && hero.hairColor == "lightBrown/green") {
    alert("This is Black Widow");
  }
  else if ((hero.team == "Justice League Of America" ||
    hero.team == "Teen Titans") && hero.universe == "DC Comics" &&
    (hero.race == "human" || hero.race == "kryptonian") &&
    hero.eyeColor == "blue" && hero.hairColor == "black") {
    alert("This is a Superman or Robin!");
  }
}

displayHero({team: "Avengers", universe: "Marvel", race: "human", eyeColor: "green", hairColor: "lightBrown/green"});