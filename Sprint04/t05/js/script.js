function createMenu() {
  
  function createSubMenuItems(map) {
    let html = '';
  
    for (let el of map.entries()) {
      html += `
        <li class="menu-sub-item">
          <div class="menu-sub-item__title">${el[0]}</div>
          <div class="menu-sub-item__price">$ ${el[1].toFixed(2)}</div>
        </li>
      `;
    }

    return `
      <ul class="menu-sub-list">
        ${html}
      </ul>
    `;
  }
  
  let html = '';
  
  for (let el of menu.entries()) {
    html += `
      <li class="menu-item">
        <h3 class="menu-item__title">${el[0]}</h3>
        <hr>
        ${createSubMenuItems(el[1])}
      </li>
    `;
  }

  menuParent.innerHTML = `
    <ul class="menu-list">
      ${html}
    </ul>
  `;
}

const menu = new Map([
  ["salads", new Map([
    ["greek salad", 5.99], ["caesar salad", 7.99]
  ])],
  ["main dishes", new Map([
    ["marqherita pizza", 12.50], ["tomato soup", 6.99], ["burger", 10.00]
  ])],
  ["desserts", new Map([
    ["cheesecake", 4.99], ["Chocolate Ice-Cream", 2.50], ["Fruit Salad", 3.99]
  ])],
  ["drinks", new Map([
    ["lemonade", 2.20], ["green tea", 1.50], ["coffee", 1.99]
  ])]
]);
const menuParent = document.getElementById('menu-area');

console.dir(menu);

createMenu();