let str1 = "You're catnip to a girl like me. "+ 
    "Handsome, dazed, and to die for...";
let lenStr1 = str1.length;
let index = str1[2];
let str2 = 'Laurel Hedare: "Game over."';
let str3 = 'Selina Kyle: catwoman"Mmm seemsCatwomanlike '+
    'everyCatWomanwoman you try to save windsCatWOMANup dead... '+
    'or deeply resentful."';

alert("Just string: " + str1 + "\n" + "Length: " + lenStr1 + "\n" +
  "Character number 2 is: " + index + "\n" +
  "To uppercase " + str1.toUpperCase() + "\n" +
  "Concatenation in a phrase: " + str1 +
  ' - Catwoman\n[Batman Returns] Batman: "I tried to save you."\n' +
  str3.replace(/catwoman/gi, " "));