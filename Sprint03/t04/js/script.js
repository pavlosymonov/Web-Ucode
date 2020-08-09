function concat(string1, string2) {
  if (string2)
    return string1.concat(' ', string2);
    
  inputString.count = 0;
  
  function inputString() {
    let input = prompt("Please, enter second string!") ?? '';

    inputString.count++;
    return string1.concat(' ', input);
  }

  return inputString;
}
