let slideIndex = 1;
let interval = setInterval(() => showSlides(slideIndex += 1), 3000);
showSlides(slideIndex);

/*
  The function plusSlider(number) switches the slide forward or backward
  the number of steps depends on "n"
*/
function plusSlides(n = 1) {
  if (interval) clearInterval(interval);
  showSlides(slideIndex += n);
}

/*
  The function showSlides(index) shows a slide by index
*/
function showSlides(n) {
  let slides = Array.from(document.getElementsByClassName("slide"));

  if (n < 1) slideIndex = slides.length;
  if (n > slides.length) slideIndex = 1;
  slides.forEach(el => el.style.display = 'none');
  slides[slideIndex - 1].style.display = 'block';
}
