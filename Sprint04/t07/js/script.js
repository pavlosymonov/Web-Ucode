let user = {
  name: document.getElementById('name').value,
  age: document.getElementById('age').value,
  email: document.getElementById('email').value
};

// Don't edit above this line

function nameCheck(value) {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join(' ');
}

function checkProp(value, oldValue, reg) {
  return reg.test(value) ? value : oldValue;
}

let regEmail = /^([\w.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
  regAge = /[1-999]/;

user = new Proxy(user, {
  set (target, prop, val) {
    if (prop == 'name') {
      target[prop] = nameCheck(val);
    } else if (prop == 'age') {
      target[prop] = checkProp(val, target[prop], regAge);
    } else if (prop == 'email') {
      target[prop] = checkProp(val, target[prop], regEmail);
    }
  }
});

// Don't edit below this line

function edit(btn) {
  btn.innerHTML = 'save';
  btn.setAttribute('onclick', 'save(this)');
  const input = document.getElementById(btn.previousElementSibling.id);
  input.removeAttribute('disabled');
}

function save(btn) {
  btn.innerHTML = 'edit';
  btn.setAttribute('onclick', 'edit(this)');
  const input = document.getElementById(btn.previousElementSibling.id);
  input.setAttribute('disabled', 'true');
  user[input.id] = document.getElementById(input.id).value;
  document.getElementById(input.id).value = user[input.id];
}