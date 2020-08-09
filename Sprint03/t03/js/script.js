function addWords(obj, wrds) {
  let objWords;

  if (typeof obj != 'object' || !obj) return null;
  objWords = obj.words.split(' ').filter((element, index, array) =>
    array.lastIndexOf(element) == index ? element : null);
  wrds.split(' ').forEach(word =>
    !objWords.includes(word) ? objWords.push(word) : null);
  obj.words = objWords.join(' ');
  return obj;
}

function removeWords(obj, wrds) {
  let objWords, index;

  if (typeof obj != 'object' || !obj) return null;
  objWords = obj.words.split(' ');
  wrds.split(' ').forEach(word => {
    while ((index = objWords.indexOf(word)) != -1)
      objWords.splice(index, 1);
  });
  obj.words = objWords.join(' ');
  return obj;
}

function changeWords(obj, oldWrds, newWrds) {
  obj = removeWords(obj, oldWrds);
  return addWords(obj, newWrds);
}
