function total(addCount, addPrice, currentTotal) {
  return (currentTotal ?? 0) + addPrice * addCount;
}

let sum = total(1, 0.1);
sum= total(1, 0.2, sum);
sum= total(1, 0.78, sum);

console.log(sum);