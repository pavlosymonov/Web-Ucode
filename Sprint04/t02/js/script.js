class Human {
  constructor(firstName, lastName, gender, age, calories) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.calories = calories;
    this.sleepFor = async () => {
      clearInterval(startIsHungry);
      resultArea.textContent = "I'm sleeping";
      await this.pauseProcess(+prompt("How long do you want to sleep?" +
        " Please enter the number of seconds.", "2") * 1000);
      resultArea.innerHTML = "I'm awake now";
    };
    this.feed = async () => {
      clearInterval(startIsHungry);
      if (this.calories > 500) {
        resultArea.innerHTML = "I'm not hungry";
      } else {
        resultArea.innerHTML = "I am eating. It takes 10 seconds";

        await this.pauseProcess(10000);
        
        this.calories += 200;
        this.updateCalories();
        this.isHungry();
      }
    };
  }

  updateCalories() {
    document.querySelectorAll('.hero-card__prop span')[4]
      .innerHTML = this.calories;
  }

  isHungry() {
    if (this.calories == 0) resultArea.innerHTML = "I'm hungry!";
    else if (this.calories < 500) resultArea.innerHTML = "I'm still hungry!";
    else resultArea.innerHTML = "I'm not hungry.";
  }

  async pauseProcess(ms) {
    document.querySelectorAll('.hero-card__func-prop')
      .forEach(el => el.setAttribute('disabled', 'disabled'));

    await this._sleep(ms);

    document.querySelectorAll('.hero-card__func-prop')
    .forEach(el => el.removeAttribute('disabled', 'disabled'));
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showObjectProperties() {
    let htmlButtons = '',
      html = '';

    if (this.alias) {
      html = `
        <div class="hero-cars__is-hero">${this.alias}</div>
      `;
    } else {
      html = `
        <div class="hero-cars__is-hero">Human</div>
      `;
    }

    for (let key in this) {
      if (typeof this[key] === 'function') {
        htmlButtons += `
          <button type="button" class="hero-card__func-prop" value="${key}">
            ${key}
          </button>
        `;
      } else {
        if (key !== 'alias') {
          html += `
            <div class="hero-card__prop">
              ${key}: <span>${this[key]}</span>
            </div>
          `;
        }
      }
    }

    return html + htmlButtons;
  }

  turnBtn() {
    if (this.alias === undefined) {
      return `
      <button id="hero-card__turning-btn" class="hero-card__func-prop"
          onclick="ternIntoSuperhero()">
        Turn into superhiro
      </button>
      `;
    }

    return '';
  }

  render() {
    heroArea.innerHTML = `
      <div class="hero-card">
        <div class="hero-card__image">
          <img src="${this.image}" alt="${this.firstName}">
        </div>
        <div class="hero-card__content">
          <div class="hero-card__info">
            ${this.showObjectProperties()}
          </div>
          ${this.turnBtn()}
        </div>
      </div>
    `;
    document.querySelectorAll('.hero-card__func-prop').forEach(el => {
      el.addEventListener('click', this[el.getAttribute('value')]);
    });
    
    setInterval(() => {
      if (this.calories > 0) {
        this.calories -= this.calories < 200 ? 100 : 200;
        this.updateCalories();
      }
    }, 60000);
  }
}

class Superhero extends Human {
  constructor(alias) {
    super();

    this.alias = alias;
    this.fly = async () => {
      resultArea.textContent = "I'm flying!";
      await this.pauseProcess(10000);
      resultArea.innerHTML = "Waiting for action";
    };
    this.fightWithEvil = () => {
      resultArea.textContent = "Khhhh-chh... Bang-g-g-g... Evil is defeated!";
    };
  }
}

function ternIntoSuperhero() {
  if (human.calories >= 500) {
    human.calories -= 500;
    superHero.calories = human.calories;
    superHero.render();
  }
  else {resultArea.innerHTML = "You can't turn, couse your hungry," +
    " accumulate at least 500 calories";
  }
}

const resultArea = document.getElementById('result'),
  heroArea = document.getElementById('hero');

// Сreate a person and his heroic side
let human = new Human("Steve", "Rogers", "male", 39, 0),
  superHero = new Superhero("Captain America");

// Add a non-iterable image property to a human object
Object.defineProperty(human, 'image', {
  value: "./assets/images/steve.jpg",
  enumerable: false
});

// Use mixines for to objects
Object.assign(superHero, human);

/*
  Check if the hero is hungry when initializing
  the page after 5 seconds of loading
*/
let startIsHungry = setTimeout(() => human.isHungry(), 5000);

// Initial rendering of a human
human.render();

// Add a non-iterable image property to a superhero object
Object.defineProperty(superHero, 'image', {
  value: "./assets/images/captain-america.jpg",
  enumerable: false
});
