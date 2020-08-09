function transformation() {
  let title = document.getElementById('hero');

  function setStyles(name, size, spacing, color) {
    title.innerHTML = name;
    title.style.fontSize = size;
    title.style.letterSpacing = spacing;
    document.getElementById('lab').style.backgroundColor = color;
  }

  if (title.textContent == "Bruce Banner") {
    setStyles("Hulk", "130px", "6px", "#70964b");
  } else if (title.textContent == "Hulk") {
    setStyles("Bruce Banner", "60px", "2px", "#ffb300");
  } else {
    alert("I don't want to do anything!");
  }
}
