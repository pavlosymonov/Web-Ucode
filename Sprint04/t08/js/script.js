const images = document.querySelectorAll('[data-src]'),
  counterArea = document.getElementById('counter');
let count = 0;

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }

  img.src = src;

  setCounter();
}

function setCounter() {
  count++;
  counterArea.innerHTML = `${count} images loaded from ${images.length}`;

  if (count == images.length) {
    counterArea.classList.add('counter-full-load');
  }
}

const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px -150px 0px"
};

const imgObserver = new IntersectionObserver((
  entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  })
}, imgOptions);

images.forEach(img => imgObserver.observe(img));
