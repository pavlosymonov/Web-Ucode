function drawTriangle() {
  let triangle = '';

  for (let i = 1; i <= 6; i++) {
    for (let j = 0; j < i; j++) triangle += '*';
    triangle += '\n';
  }
  alert(triangle);
}

drawTriangle();
