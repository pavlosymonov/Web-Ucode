function displaySuperTeam() {
  'use strict';

  function askQuation(question) {
    let input = prompt(question);

    while (input == '') {
      input = prompt(question);
    }
    return !input ? "Anonymous" : input;
  }

  let superTeam = {};

  superTeam.title = askQuation("String with the name of the team.");
  superTeam.leader = askQuation("String with the name of the team's leader.");
  superTeam.members = askQuation(" String with the names of the" +
    "members of the team separated by a comma.").split(',');
  superTeam.memberCount = superTeam.members.length + 1;
  superTeam.agenda = askQuation("String describing what are" +
    "the goals and ideas of the team.");
  superTeam.isEvil = Boolean(askQuation("true or false that explains" +
    "whether the team is evil or not."));

  alert(`Hero's the team: \
    \nname - ${superTeam.title} \
    \nleader - ${superTeam.leader} \
    \nmembers - ${superTeam.members.join(', ')} \
    \nmembersCount - ${superTeam.memberCount} \
    \nagenda - ${superTeam.agenda} \
    \nisEvil - ${superTeam.isEvil}`);
}

displaySuperTeam();

// "Avengers"
// "Iron-Man"
// ["Captain America", "Black widow", "Spider-Man"]
// 4
// "Save the world from villains and unforeseen disasters"
// false
