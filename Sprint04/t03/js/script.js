let boxsArea = document.getElementById('container');
let state = {
  offsetX: 0,
  offsetY: 0,
  target: null
};

boxsArea.addEventListener('dblclick', event => {
  const target = event.target;

  if (target && target.classList.contains('box')) {
    if (target.getAttribute('value') === 'on') {
      target.setAttribute('value', 'off');
    } else {
      target.setAttribute('value', 'on');
    }
  }
});

boxsArea.addEventListener('mousedown', event => {
  if (event.target && event.target.classList.contains('box') &&
      event.target.getAttribute('value') === 'on') {
    state.target = event.target;
    state.offsetX = event.offsetX; 
    state.offsetY = event.offsetY;
  }
});

boxsArea.addEventListener('mouseup', () => {
  state.target = null;
});

boxsArea.addEventListener('mousemove', e => {
  if (state.target) {
    state.target.style.left = (e.pageX - state.offsetX) + 'px';
    state.target.style.top = (e.pageY - state.offsetY) + 'px';
  }
});
