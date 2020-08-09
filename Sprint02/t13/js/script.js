let num = prompt("Please, enter the number from 1 to 10");

while ((num < 1 || num > 10) || !Number.isFinite(+num)) {
  alert("Your input is wrong.\nPlease, try again.")
  num = prompt("Please, enter the number from 1 to 10");
}

switch (Math.floor(+num)) {
  case 1:
    alert("Back to square 1");
    break;
  case 2:
    alert("Goody 2-shoes");
    break;
  case 3:
  case 6:
    alert("Two's company, three's a crowd");
    break;
  case 4:
  case 9:
    alert("Counting sheep");
    break;
  case 5:
    alert("Take five");
    break;
  case 7:
    alert("Seventh heaven");
    break;
  case 8:
    alert("Behind the eight-ball");
    break;
  case 10:
    alert("Cheaper by the dozen");
    break;
}
