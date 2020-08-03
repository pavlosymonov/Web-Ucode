function showResult(animal) {
  if (animal.gender == "male" && +animal.age < 18)
    alert(`The superhero name is: ${animal.name}-boy!`);
  else if (animal.gender == "male" && +animal.age >= 18)
    alert(`The superhero name is: ${animal.name}-man!`);
  else if (animal.gender == "female" && +animal.age < 18)
    alert(`The superhero name is: ${animal.name}-girl!`);
  else if (animal.gender == "female" && +animal.age >= 18)
    alert(`The superhero name is: ${animal.name}-woman!`);
  else if (!animal.gender.length && +animal.age < 18)
    alert(`The superhero name is: ${animal.name}-kid!`);
  else if (!animal.gender.length && +animal.age >= 18)
    alert(`The superhero name is: ${animal.name}-hero!`);
}

function askQuestions() {
  let animal = {};
  let regName = /^[a-zA-Z]{1,20}$/,
    regGender = /^(male|female|)$/i,
    regAge = /^[1-9]\d{1,4}$/;

  animal.name = prompt("What animal is the superhero most similar to?");
  if (!regName.exec(animal.name) || animal.name == null) {
    alert("Animal name is wrong!\nOne word, only letters, from 1 to 20 letters max.");
    return;
  }
  animal.gender = prompt("Is the superhero male or female? Leave blank if unknown or other.");
  if (!regGender.exec(animal.gender)) {
    alert("Gender is wrong!\nType only male, female or blank (not case sensitive)");
    return;
  }
  animal.age = prompt("How old is the superhero?");
  if (!regAge.exec(animal.age)) {
    alert("Age is wrong!\nMax length 5, only digits, can't start from zero!");
    return;
  }
  showResult(animal);
}

askQuestions();
