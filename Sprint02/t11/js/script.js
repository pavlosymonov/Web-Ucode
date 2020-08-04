// the first loop
let i = 6;
let res1= ' ';

do {
  res1 += i + ' ';
  i++;
} while (i < 5);

// the second loop
i = 6;
let res2= ' ';

while (i < 7) {
  res2 += i + ' ';
  i++;
}

alert('do while:' + res1 + 'while:' + res2);

i = 1;
let res3 = '';
while (i <= 16) {
  res3 += i + ' ';
  i *= 2;
}

alert("Numbers row is: " + res3);
