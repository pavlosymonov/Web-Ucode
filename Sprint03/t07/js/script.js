function changePage() {
  let items = document.querySelectorAll("#characters>li");

  /*
    The function creates circles
    and adds them to the necessary blocks
  */
  function addCircles(el) {
    let attrText = el.getAttribute('data-element');

    el.append(document.createElement("br"));
    attrText.split(' ').forEach(word => {
      let circle = document.createElement("div");

      circle.className = 'elem';
      if (attrText != 'none') {
        circle.className += ` ${word}`; 
      } else {
        let line = document.createElement("div");
  
        line.className = 'line';
        circle.append(line);
      }
      el.append(circle);
    });
  }

  items.forEach(el => {
    if (!el.classList.value.match(/(good|evil|unknown)/))
      el.classList.add('unknown');
    if (el.getAttribute('data-element') == null)
      el.setAttribute('data-element', 'none');
    addCircles(el);
  });
}

changePage();
