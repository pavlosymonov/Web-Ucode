function script(input) {
  if (input == 1)
    alert(input * 2 / 'a');
  else if (input == 2)
    alert(input - input / 0);
  else if (input == 3)
    alert(0 * Infinity);
  else if (input == 4)
    alert(input * 40000000 == Infinity)
  else
    alert("Wrong input");
}

for (let i = 1; i <= 5; i++) {
  script(i);
}
