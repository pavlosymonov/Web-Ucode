class Cart {
  constructor() {
    this.parent = document.getElementById("header__cart");
    this.btnParent = document.getElementById("header__cart-button");
    this.cartParent = document.getElementById("dropcart");
    this.activeClass = 'dropcart-open';
  }

  outsideClickListener(event) {
    let elem = cart.parent;
    let dropCart = elem.querySelector('#dropcart');

    if (!elem.contains(event.target) &&
        dropCart.classList.contains(cart.activeClass)) {
      dropCart.classList.remove(cart.activeClass);
      document.removeEventListener('mousedown', cart.outsideClickListener);
    }
  }

  handleClickOnCart() {
    let dropCart = document.querySelector('#dropcart');

    if (dropCart.classList.contains(this.activeClass)) {
      dropCart.classList.remove(this.activeClass);
    } else {
      dropCart.classList.add(this.activeClass);
    }

    document.addEventListener('mousedown', cart.outsideClickListener);
  }

  handleRemoveProdFromCart(elem, id) {
    elem.parentNode.remove();
    cart.productsStore.splice(cart.productsStore.indexOf(id), 1);
    localStorage.setItem(
      localStorageUtil.keyNameProds, JSON.stringify(cart.productsStore)
    );

    cart.renderCartButton(cart.productsStore.length);
    cart.renderCart();
    prod.render();
  }

  setPrice(price) {
    if (typeof price === 'object') {
      return `
        1 × 
        <strong class="new-price">$${price[0].toFixed(2)}</strong>
        <span class="old-price">$${price[1].toFixed(2)}</span>
      `;
    }
    return `
      1 × <strong>$${price.toFixed(2)}</strong>
    `;
  }

  renderCartButton(count) {
    this.btnParent.innerHTML = `
      <button type="button" class="header__cart-area">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <circle cx="7" cy="17" r="2"></circle>
          <circle cx="15" cy="17" r="2"></circle>
          <path d="M20 4.4V5l-1.8 6.3c-.1.4-.5.7-1 .7H6.7c-.4 0-.8-.3-1-.7L3.3 3.9c-.2-.6-.7-.9-1.2-.9H.4C.2 3 0 2.8 0 2.6V1.4c0-.2.2-.4.4-.4h2.5c1 0 1.8.6 2.1 1.6l.1.4 2.3 6.8c0 .1.2.2.3.2h8.6c.1 0 .3-.1.3-.2l1.3-4.4c0-.2-.2-.4-.4-.4H9.4c-.2 0-.4-.2-.4-.4V3.4c0-.2.2-.4.4-.4h9.2c.8 0 1.4.6 1.4 1.4z"></path>
        </svg>
        <span class="header__cart-value">${count}</span>
      </button>
    `;
  }

  renderCart() {
    let htmlCatalog = '';
    let sumCatalog = 0;
    this.productsStore = localStorageUtil
      .getValue(localStorageUtil.keyNameProds);

    CATALOG.forEach(({ id, name, price, img }) => {
      if (this.productsStore.indexOf(id) !== -1) {
        htmlCatalog += `
          <li class="dropcart__products-item">
            <a href="#" class="dropcart__product-img">
              <img src=${img} alt=${name}>        
            </a>
            <div class="dropcart__product-info">
              <a href="#" class="dropcart__product-name">${name}</a>
              <div class="dropcart__product-price">${this.setPrice(price)}</div>    
            </div>
            <button type="button" class="dropcart__product-remove"
              onclick="cart.handleRemoveProdFromCart(this, '${id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                <path d="M8.8 8.8c-.4.4-1 .4-1.4 0L5 6.4 2.6 8.8c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L3.6 5 1.2 2.6c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0L5 3.6l2.4-2.4c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L6.4 5l2.4 2.4c.4.4.4 1 0 1.4z"></path>
              </svg>
            </button>
          </li>
        `;
        sumCatalog += typeof price === 'object' ? price[0] : price;
      }
    });

    this.cartParent.innerHTML = `
      
      ${htmlCatalog === '' ? 
        '<span class="empty-cart">Cart is empty!</span>' : `
          <ul class="dropcart__products-list">  
            ${htmlCatalog}
          </ul>
        `}
      <div class="dropcart__total">
        <strong>Total</strong>
        <span>$${sumCatalog.toFixed(2)}</span>
      </div>
      <div class="dropcart__buttons">
        <a href="#" class="dropcart__btn btn-secondary">
          View Cart
        </a>
        <a href="#" class="dropcart__btn btn-primary">
          Checkout
        </a>
      </div>
    `;
  }
}

const cart = new Cart();
