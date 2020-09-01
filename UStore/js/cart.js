class Cart {
  constructor() {
    this.parent = document.getElementById("header__cart");
  }

  render(count) {
    this.parent.innerHTML = `
      <a href="#" class="header__cart-button">
        <span class="header__cart-area">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="">
            <circle cx="7" cy="17" r="2"></circle>
            <circle cx="15" cy="17" r="2"></circle>
            <path d="M20 4.4V5l-1.8 6.3c-.1.4-.5.7-1 .7H6.7c-.4 0-.8-.3-1-.7L3.3 3.9c-.2-.6-.7-.9-1.2-.9H.4C.2 3 0 2.8 0 2.6V1.4c0-.2.2-.4.4-.4h2.5c1 0 1.8.6 2.1 1.6l.1.4 2.3 6.8c0 .1.2.2.3.2h8.6c.1 0 .3-.1.3-.2l1.3-4.4c0-.2-.2-.4-.4-.4H9.4c-.2 0-.4-.2-.4-.4V3.4c0-.2.2-.4.4-.4h9.2c.8 0 1.4.6 1.4 1.4z"></path>
          </svg>
          <span class="header__cart-value">${count}</span>
        </span>
       </a>
    `;
  }
}

const cart = new Cart;

cart.render(localStorageUtil.getProducts().length);
