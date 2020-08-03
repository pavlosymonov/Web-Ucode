let num = prompt("Please, enter the number from 1 to 10");
let idiom = '';

while ((num < 1 || num > 10) || !Number.isFinite(+num)) {
  alert("Your input is wrong.\nPlease, try again.")
  num = prompt("Please, enter the number from 1 to 10");
}

switch (+num) {
  case 1:
    idiom = "Back to square 1";
    break;
  case 2:
    idiom = "Goody 2-shoes";
    break;
  case 3:
  case 6:
    idiom = "Two's company, three's a crowd";
    break;
  case 4:
  case 9:
    idiom = "Counting sheep";
    break;
  case 5:
    idiom = "Take five";
    break;
  case 7:
    idiom = "Seventh heaven";
    break;
  case 8:
    idiom = "Behind the eight-ball";
    break;
  case 10:
    idiom = "Cheaper by the dozen";
    break;
}

alert(idiom);
