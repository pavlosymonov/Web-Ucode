'use strict';

const input = document.getElementById('search-input'),
  heroesParent = document.getElementById('heroes'),
  compareCounter = document.getElementById('compare-length'),
  loader = document.querySelector('.loader');

const api = 'https://superheroapi.com/api/1474718272738286/';
const cors = 'https://cors-anywhere.herokuapp.com/';

let tempArr = [];

async function searchHeroes() {
  if (input.value) {
    loader.style.display = 'block';
    const data = await getData(`search/${input.value}`);
    loader.style.display = 'none';

    if (!data) return;

    tempArr = data.results;

    heroesParent.innerHTML = '';

    tempArr.forEach(hero => {
      heroesParent.innerHTML += showHero(hero);
    });

    input.value = '';
  }
}

async function randomHero() {
  loader.style.display = 'block';
  const data = await getData(getRandomNumber());
  loader.style.display = 'none';

  if (!data) return;

  tempArr = [data];

  heroesParent.innerHTML = showHero(data);
  console.log(data);
}

function compareHeroes() {
  if (compareList.size < 2) {
    alert("Minimum number to compare 2 heroes!");
    return;
  }

  createListOfStats();
  showChart(compareList);

  heroesParent.innerHTML = '';
}























async function addToCompare(btn) {
  if (compareList.size < 20) {
    const key = btn.getAttribute('data-id');

    compareList.add(getHeroFromTempArr(key));
    compareCounter.innerHTML = String(compareList.size);
  } else {
    alert("Maximum number to compare 20 heroes!");
    return;
  }
}

function getHeroFromTempArr(key) {
  for (let el of tempArr) {
    if (el.id === key) {
      return el;
    }
  }
}

function showHero(hero) {
  return `
    <button class="hero-btn" data-id="${hero.id}" onclick="addToCompare(this)">
      <div class="hero-btn__alias">${hero.name}</div>
      <div class="hero-btn__name">
        ${hero.biography['full-name'] == '' ?
    'Unknown' : hero.biography['full-name']}
      </div>
    </button>
  `;
}

async function getData(req) {
  const response = await fetch(cors + api + req);
  const data = await response.json();

  if (data.response === 'error') {
    alert(data.error);
    return null;
  }

  return data;
}

function getRandomNumber() {
  const maxId = 731, minId = 1;

  return Math.floor(Math.random() * (maxId - minId) + minId);
}

