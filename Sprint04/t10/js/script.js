// window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const input = document.getElementById('search-input');
  const api = 'https://superheroapi.com/api/1474718272738286/';
  const cors = 'https://cors-anywhere.herokuapp.com/';

  async function searchHeroes() {
    if (input.value) {
      const response = await fetch(cors + api + `search/${input.value}`);
      const data = await response.json();

      console.log(data);
      input.value = '';
    }
  }

  function randomHero() {

  }

  function compareHeroes() {

  }
// });