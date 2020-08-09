function checkDivision(beginRange, endRange) {
  for (let i = beginRange; i <= endRange; i++) {
    let res = '';

    if (i % 2 == 0) {
       res = `${i}`;
       res += ' is even';
    }
    if (i % 3 == 0) {
      res ? res += ',' : res = `${i}`;
      res += ' is a multiple of 3';
    }
    if (i % 10 == 0) {
      res ? res += ',' : res = `${i}`;
      res += ' is divisible by 10';
    }
    console.log(res ? res + '\n' : `${i} -\n`);
  }
}

function division() {
  let num1 = +prompt("Enter the start of the range", "1");
  let num2 = +prompt("Enter the and of the range", "100");

  if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
    alert("Some number is wrong!");
    return;
  }
  checkDivision(num1, num2);
}

division();
