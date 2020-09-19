class Movie {
  constructor(name, image, description, date, stars) {
    this.name = name;
    this.image = image;
    this.desc = description;
    this.date = date;
    this.stars = stars;
  }

  addTofavorites() {
    favoritMovies.add(this);
  }

  removeFromfavorites() {
    favoritMovies.delete(this);
  }
}

function renderTabs(movies) {
  const tabsBlock = document.getElementById('movies');

  tabsBlock.innerHTML = '';
  
  if (movies.size !== 0) {
    let starsRender = stars => {
      let res = '';
      
      stars.forEach(star => {
        res += `
          <div class="tab-content__star">${star}</div>
        `;
      });
  
      return res;
    };
    let tabsHTML = '',
      tabsContentHTML = '';
  
    movies.forEach((movie) => {
      let activeHeartClass = '';
      
      tabsHTML += `
        <div class="tab-item"><span>${movie.name}</span></div>
      `;

      if (favoritMovies.has(movie)) {
        activeHeartClass = ' add-to-favorites__active';
      }

      tabsContentHTML += `
        <div class="tab-content">
          <div class="tab-content__info">
            <div class="tab-content__add-to-favorites${activeHeartClass}"
                value="${movie.name}">
              <svg onclick="addTofavorites(this)" xmlns="http://www.w3.org/2000/svg"
                  version="1.1" width="20px" height="20px" viewBox="0 0 512 512" xml:space="preserve">
                <path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268    c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514    c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482    s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514    C512,93.417,453.532,30,376,30z"/>
              </svg>
            </div>
            <div class="tab-content__title">${movie.name}</div>
            <div class="tab-content__date">${movie.date}</div>
            <div class="tab-content__stars">
              ${starsRender(movie.stars)}
            </div>
            <div class="tab-content__desc">${movie.desc}</div>
          </div>
          <div class="tab-content__image">
            <img src="${movie.image}" alt="${movie.name} Promo">
          </div>
        </div>
      `;
    });

    tabsBlock.innerHTML += `
      <div id="tabs-block">
        ${tabsHTML}
      </div>
      <div id="tabs-content-block">
        ${tabsContentHTML}
      </div>
    `;

    hideTabsContent();
    showTabsContent();
  } else {
    tabsBlock.innerHTML = `
      <div class="empty-catalog">Oops.. unfortunately, you don't have any favorites yet.</div>
    `;
  }
}

function hideTabsContent() {
  const tabs = document.querySelectorAll('.tab-item'),
    tabsContent = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.classList.remove('tab-item__active');
  });

  tabsContent.forEach(item => {
    item.classList.add('hide-tab-content');
    item.classList.remove('show-tab-content');
  });
}

function showTabsContent(i = 0) {
  const tabs = document.querySelectorAll('.tab-item'),
    tabsContent = document.querySelectorAll('.tab-content');

  tabsContent[i].classList.add('show-tab-content', 'fade-tab-content');
  tabsContent[i].classList.remove('hide-tab-content');
  tabs[i].classList.add('tab-item__active');
}

function addTofavorites(btn) {
  if (btn.parentNode.classList.contains('add-to-favorites__active')) {
    allMovies.forEach(el => {
      if (el.name === btn.parentNode.getAttribute('value')) {
        el.removeFromfavorites();
      }
    });

    btn.parentNode.classList.remove('add-to-favorites__active');

    if (filter === 'favorites') {
      renderTabs(favoritMovies);
    }
  } else {
    allMovies.forEach(el => {
      if (el.name === btn.parentNode.getAttribute('value')) {
        el.addTofavorites();
      }
    });

    btn.parentNode.classList.add('add-to-favorites__active');
  }
}

let favoritMovies = new Set();
let allMovies = new Set([
  new Movie(
    "John Wick",
    "./assets/images/john-wick.jpg",
    "With the untimely death of his beloved wife still bitter in his mouth, John Wick, the expert former assassin, receives one final gift from her--a precious keepsake to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wife's present, the legendary hitman will be forced to unearth his meticulously concealed identity.",
    "1 January 2015",
    ['Keanu Reeves', 'Michael Nyqvist', 'Alfie Allen']
  ),
  new Movie(
    "Joker",
    "./assets/images/Joker.jpg",
    "Arthur Fleck works as a clown and is an aspiring stand-up comic. He has mental health issues, part of which involves uncontrollable laughter. Times are tough and, due to his issues and occupation, Arthur has an even worse time than most. Over time these issues bear down on him, shaping his actions, making him ultimately take on the persona he is more known as...Joker.",
    "3 October 2019",
    ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz']
  ),
  new Movie(
    "Avengers: Endgame",
    "./assets/images/Avengers.jpg",
    "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
    "29 April 2019",
    ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo']
  ),
  new Movie(
    "Inception",
    "./assets/images/Inception.jpg",
    "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible, inception.",
    "22 July 2010",
    ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page']
  ),
  new Movie(
    "Spider-Man: Far from Home",
    "./assets/images/Spider-Man.jpg",
    "Our friendly neighborhood Super Hero decides to join his best friends Ned, MJ, and the rest of the gang on a European vacation. However, Peter's plan to leave super heroics behind for a few weeks are quickly scrapped when he begrudgingly agrees to help Nick Fury uncover the mystery of several elemental creature attacks, creating havoc across the continent.",
    "4 July 2019",
    ['Tom Holland', 'Samuel L. Jackson', 'Jake Gyllenhaal']
  ),
  new Movie(
    "The Dark Knight",
    "./assets/images/The-Dark-Knight.jpg",
    "Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as /\"The Joker\" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him.",
    "14 August 2008",
    ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
  )
]);
const tabsParent = document.querySelector('.movies'),
  filterParent = document.querySelector('.filters');

let filter = 'all';

renderTabs(allMovies);

tabsParent.addEventListener('click', (event) => {
  const target = event.target;
  const tabs = document.querySelectorAll('.tab-item');
  
  if (target && target.classList.contains('tab-item')) {
    tabs.forEach((item, i) => {
      if (target == item) {
        hideTabsContent();
        showTabsContent(i);
      }
    });
  }
});

filterParent.addEventListener('click', (event) => {
  const target = event.target;

  if (target && target.classList.contains('filter-btn')) {
    if ((filter = target.getAttribute('value')) === 'all') {
      renderTabs(allMovies);
    } else {
      renderTabs(favoritMovies);
    }

    filterParent.querySelectorAll('.filter-btn')
      .forEach(el => el.classList.remove('filter-btn-active'));
    target.classList.add('filter-btn-active');
  }
});
