function checkBrackets(str) {
  if (typeof str != "string") return 0;

  let opened = 0,
  mustAdded = 0,
  strLen = str.length;

  for (let i = 0; i < strLen; i++) {
    if (str[i] == '(') opened++;
    else if (str[i] == ')') opened ? opened-- : mustAdded++;
  }
  return mustAdded + opened;
}
