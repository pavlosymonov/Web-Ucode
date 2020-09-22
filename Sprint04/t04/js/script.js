const magician = {
  _hat: './assets/images/hat.png',
  _getPortrait() {
    if (this._portrait) return this._portrait;
    else return'./assets/images/magician.png';
  },
  'do magic'() {
    console.log(`ABRACADABRA
    The prototype of ${this.name} is `);
    console.log(Object.getPrototypeOf(this));
  }
};

class Creature {
  constructor(name, age, species) {
    this.name = name;
    this.age = age;
    this.species = species;
    this.sayHello = function() {
      console.log(`Hello, my name is ${this.name}!`);
    };
  }
}

class Human extends Creature {
  constructor(name, age, species, job) {
    super(name, age, species);
    
    this.job = job;
  }
}
 
class Dog extends Creature {
  constructor(name, age, species, color) {
    super(name, age, species);
    
    this.color = color;
  }
}

class Vampire extends Human {
  constructor(name, age, species, job, title) {
    super(name, age, species, job);
    
    this.title = title;
  }
}

class Werewolf extends Human {
  constructor(name, age, species, job) {
    super(name, age, species, job);

    this._isWolf = false;
  }

  transform() {
    this._isWolf = !this._isWolf;

    if (this._isWolf) {
      magician._portrait = "./assets/images/werewolf.png";
      Object.assign(werewolf, wolfHowl);
    } else {
      magician._portrait = "./assets/images/human.png";
      delete this.howl;
    }
    
    img.src = magician._getPortrait();
    addWolfContent();
  }
}

function generalProperties(customProperty = '') {
  return `
    <button type="button" onclick="magician['do magic']()">Do Magic</button>
    <button type="button" onclick="magician.sayHello()">Say Hello</button>
    ${customProperty}
    <div>Name: <span class="propValue">${magician.name}</span></div>
    <div>Age: <span class="propValue">${magician.age}</span></div>
    <div>Species: <span class="propValue">${magician.species}</span></div>
  `;
}

function noProtoContent(btn) {
  Object.setPrototypeOf(magician, Object.prototype);

  delete magician._portrait;

  contentBlock.innerHTML = `
    <button type="button" onclick="magician['do magic']()">
      Do Magic
    </button>
  `;
}

function humanProtoContent() {
  Object.setPrototypeOf(magician, human);

  magician._portrait = "./assets/images/human.png";

  contentBlock.innerHTML = `
    ${generalProperties()}
    <div>Job: <span class="propValue">${magician.job}</span></div>
  `;
}

function dogProtoContent() {
  Object.setPrototypeOf(magician, dog);

  magician._portrait = "./assets/images/dog.png";

  contentBlock.innerHTML = `
    ${generalProperties()}
    <div>Color: <span class="propValue">${magician.color}</span></div>
  `;
}

function vampireProtoContent() {
  Object.setPrototypeOf(magician, vampire);

  magician._portrait = "./assets/images/vampire.png";

  contentBlock.innerHTML = `
    ${generalProperties()}
    <div>Job: <span class="propValue">${magician.job}</span></div>
    <div>Title: <span class="propValue">${magician.title}</span></div>
  `;
}

function werewolfProtoContent() {
  Object.setPrototypeOf(magician, werewolf);

  magician._portrait = "./assets/images/human.png";
  delete magician.howl;
  magician._isWolf = false;

  addWolfContent();
}

function addWolfContent() {
  let html = `
    <button type="button" onclick="magician.transform()">Transform</button>
  `;

  if (magician._isWolf) {
    html += `
      <button type="button" onclick="magician.howl()">Howl</button>
    `;
  }

  contentBlock.innerHTML = `
    ${generalProperties(html)}
    <div>Job: <span class="propValue">${magician.job}</span></div>
  `;
}

function changeStatus(btn) {
  buttons.forEach(el => el.classList.remove('active'));
  btn.classList.add('active');

  switch(btn.textContent) {
    case "no prototype":
      noProtoContent();
      break;
    case "human prototype": 
      humanProtoContent();
      break;
    case "vampire prototype":
      vampireProtoContent();
      break;
    case "dog prototype":
      dogProtoContent();
      break;
    case "werewolf prototype":
      werewolfProtoContent();
      break;
  }

  img.src = magician._getPortrait();
}

let human = new Human("Linda", 22, "human", "doctor"),
  dog = new Dog("Fluffy", 3, "dog", "brown"),
  vampire = new Vampire("Vlad", 915, "vampire", "unemployed", "count"),
  werewolf = new Werewolf("Rachel", 18, "human", "teacher");
  
const contentBlock = document.getElementById('properties'),
  buttons = document.querySelectorAll('.protoBtn'),
  img = document.getElementById('head');

const wolfHowl = {
  howl: () => {
    console.log("ARH-WOOOOOOOOOOOOOOOOOOOO");
  }
};

noProtoContent();
