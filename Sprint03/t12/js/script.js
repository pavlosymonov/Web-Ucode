let storageName = 'archive';
const addStorageBtn = document.querySelector('#add-storage');
const clearStorageBtn = document.querySelector('#clear-storage');
outputStorage();

/* 
  Hang an event handler on the
  addStorage and clearStorage buttons 
*/
addStorageBtn.addEventListener('click', addToStorage);
clearStorageBtn.addEventListener('click', clearStorage);

/* 
  The addStarage function adds the desired data to the storage
  and output to the notes block
*/
function addToStorage() {
  let input = document.querySelector('textarea');
  if (input.value) {
    setStorage(input.value);
    outputStorage();
    input.value = '';
  } else {
    alert(`It's empty. Tryto input something in "Text input"`);
  }
}

/* 
  Display all data from the storage in the archive
*/
function outputStorage() {
  let outputArea = document.querySelector('#notes-output');
  let storage = localStorage.getItem(storageName);
  let output = '';
  if (!storage) {
    outputArea.innerHTML = "[Empty]";
  } else {
    storage = storage.split('|');
    storage.forEach(el => output += `--> ${el}<br>`);
    outputArea.innerHTML = output;
  }
}

/* 
  Add value to store
*/
function setStorage(value = "") {
  let storageInfo = localStorage.getItem(storageName);
  let date = new Date();
  value += ` [${date.toLocaleString()}]`;
  value = !storageInfo ? value : storageInfo + `|${value}`;
  localStorage.setItem(storageName, value);
}

/*
  Clear storage function
*/
function clearStorage() {
  if (confirm("Are you sure?")) {
    localStorage.removeItem(storageName);
    outputStorage();
  }
}
