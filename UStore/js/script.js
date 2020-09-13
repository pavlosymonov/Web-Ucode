function render() {
  searchForm.render();

  filters.render();

  sortAndShow.render();

  prod.render();

  cart.renderCartButton(localStorageUtil
    .getValue(localStorageUtil.keyNameProds).length);
  cart.renderCart();
}

render();

const mobilemenu = document.getElementById('mobilemenu');

document.getElementById('header__gamburger').addEventListener('click', () => {
  mobilemenu.classList.add('mobilemenu--open');
  bodyOverflow('hidden', '17px');
});

document.querySelector('.mobilemenu__overlay').addEventListener('click', () => {
  mobilemenu.classList.remove('mobilemenu--open');
  bodyOverflow('auto', '0');
});

document.querySelector('.mobilemenu__close').addEventListener('click', () => {
  mobilemenu.classList.remove('mobilemenu--open');
  bodyOverflow('auto', '0');
});

function bodyOverflow(overflow, padding) {
  document.body.style.overflow = overflow;
  document.body.style.paddingRight = padding;
}
