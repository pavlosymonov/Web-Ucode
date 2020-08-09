function total(addCount, addPrice, currentTotal) {
  return (currentTotal ?? 0) + addPrice * addCount;
}
