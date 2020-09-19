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

function Creature(name, age, species) {
  this.name = name;
  this.age = age;
  this.species = species;
  this.sayHello = function() {
    console.log(`Hello, my name is ${this.name}!`);
  };
}
 
function Dog(name, age, species, color) {
  Creature.call(this, name, age, species);
  
  this.color = color;
}

function Human(name, age, species, job) {
  Creature.call(this, name, age, species);
  
  this.job = job;
}

function Vampire(name, age, species, job, title) {
  Human.call(this, name, age, species, job);
  
  this.title = title;
}

function generalProperties() {
  return `
    <button type="button" onclick="magician.sayHello()">Say Hello</button>
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
    <button type="button" onclick="magician['do magic']()">Do Magic</button>
    ${generalProperties()}
    <div>Job: <span class="propValue">${magician.job}</span></div>
  `;

}

function dogProtoContent() {
  Object.setPrototypeOf(magician, dog);

  magician._portrait = "./assets/images/dog.png";

  contentBlock.innerHTML = `
    <button type="button" onclick="magician['do magic']()">Do Magic</button>
    ${generalProperties()}
    <div>Color: <span class="propValue">${magician.color}</span></div>
  `;
}

function vampireProtoContent() {
  Object.setPrototypeOf(magician, vampire);

  magician._portrait = "./assets/images/vampire.png";

  contentBlock.innerHTML = `
    <button type="button" onclick="magician['do magic']()">Do Magic</button>
    ${generalProperties()}
    <div>Job: <span class="propValue">${magician.job}</span></div>
    <div>Title: <span class="propValue">${magician.title}</span></div>
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
  }

  img.src = magician._getPortrait();
}

Human.prototype = Object.create(Creature.prototype);
Human.prototype.constructor = Human;
Dog.prototype = Object.create(Creature.prototype);
Dog.prototype.constructor = Dog;
Vampire.prototype = Object.create(Human.prototype);
Vampire.prototype.constructor = Vampire;

let human = new Human("Linda", 22, "human", "doctor"),
  dog = new Dog("Fluffy", 3, "dog", "brown"),
  vampire = new Vampire("Vlad", 915, "vampire", "unemployed", "count");
  
const contentBlock = document.getElementById('properties'),
  buttons = document.querySelectorAll('.protoBtn'),
  img = document.getElementById('head');

noProtoContent();
