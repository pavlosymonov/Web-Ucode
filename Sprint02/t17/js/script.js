function writeMessage(message) {
  alert(message);
  console.log(message);
}

function greeting() {
  let firstName = prompt("Enter you first name.");
  let lastName = prompt("Enter your last name.");
  let regCheck = /^[a-zA-z]+$/;

  if (!regCheck.exec(firstName) || !regCheck.exec(lastName)) {
    writeMessage("Wrong input!");
    return;
  }

  if (firstName[0] != firstName[0].toUpperCase())
    firstName = firstName[0].toUpperCase() + firstName.slice(1);

  if (lastName[0] != lastName[0].toUpperCase())
    lastName = lastName[0].toUpperCase() + lastName.slice(1);

  writeMessage(`Hello, ${firstName} ${lastName}!`);
}

greeting();
