let cookieName = 'archive';
const addCookiesBtn = document.querySelector('#add-cookies');
const clearCookiesBtn = document.querySelector('#clear-cookies');
outputCookies();

/* 
  Hang an event handler on the
  addCookies and clearCookies buttons 
*/
addCookiesBtn.addEventListener('click', addCookie);
clearCookiesBtn.addEventListener('click', clearCookies);

/* 
  The addCookies function adds the desired data to the cookie
  and output to the notes block
*/
function addCookie() {
  let input = document.querySelector('textarea');
  if (input.value) {
    setCookie(input.value, 30);
    outputCookies();
    input.value = '';
  } else {
    alert(`It's empty. Tryto input something in "Text input"`);
  }
}

/* 
  Display all data from the cookie in the archive
*/
function outputCookies() {
  let outputArea = document.querySelector('#notes-output');
  let cookies = getCookie(cookieName);
  let output = '';
  if (cookies === '') {
    outputArea.innerHTML = "[Empty]";
  } else {
    cookies = cookies.split(',');
    cookies.forEach(el => output += `--> ${el}<br>`);
    outputArea.innerHTML = output;
  }
}

/* 
  Add value to cookie
*/
function setCookie(value = "", days = 30) {
  let date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  let expires = "; expires=" + date.toUTCString();
  let cookieInfo = getCookie(cookieName);
  value = cookieInfo === '' ? value : cookieInfo + `,${value}`;
  document.cookie = cookieName + "=" + value + expires;
}

/* 
  Get value from cookie by cookie name
*/
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArr = decodedCookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    let c = cookieArr[i];
    while (c.charAt(0) == ' ') { c = c.substring(1);}
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/* 
  Clear cookie by name
*/
function clearCookies() {
  if (confirm("Are you sure?")) {
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970;`;
    outputCookies();
  }
}