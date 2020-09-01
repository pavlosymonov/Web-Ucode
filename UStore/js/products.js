class Products {

  constructor() {
    this.parent = document.getElementById('shop-area__catalog');
    this.selectedProducts = localStorageUtil.getProducts();
    this.labelAdd = 'Add to cart';
    this.labelCheckout = 'Checkout';
    this.classNameActive = 'shop-area__item-btn-active';
  }

  setPrice(price) {
    if (typeof price === 'number') {
      return `<span class="shop-area__item-price">$${price.toFixed(2)}</span>`;
    }
    return `
      <div>
        <span class="old-price">$${price[1].toFixed(2)}</span>
        <span class="shop-area__item-price new-price">
          $${price[0].toFixed(2)}
        </span>
      </div>
    `;
  }

  availability(amount) {
    let presence = 'Available';
    let available = 'availability-true';

    if (amount <= 0) {
        presence = 'Not available';
        available = '';
    }

    return `
      <span class="shop-area__availability ${available}">
        ${presence}
      </span>
     `;
  }

  handleSetLocationStorage(elem, id) {
    const { pushProduct, products } = localStorageUtil.putProducts(id);

    if (pushProduct) {
      elem.classList.add(this.classNameActive);
      elem.innerHTML = this.labelCheckout;
    } else {
      elem.classList.remove(this.classNameActive);
      elem.innerHTML = this.labelAdd;
    }

    cart.render(products.length);
  }

  onClickProdBtnHandler(id, amount) {
    if (amount <= 0) {
      return ``;
    }
    return `onclick="prod.handleSetLocationStorage(this, '${id}')"`;
  }

  numberOfProdsToShow() {
    const select = document.getElementById('show-how-many');

    return select.options[select.selectedIndex].text;
  }

  // handleCountProductsInCatalog() { ---- TODO: Reshow products in catalog
  //
  // }

  render() {
    let htmlCatalog = '';
    let showCount = this.numberOfProdsToShow();

    for (let i = 0; i < showCount; i++) {
      let { id, name, brand, price, img, amount } = CATALOG[i];
      let activeClass = '';
      let activeText = '';

      if (amount === 0) {
        activeClass = 'shop-area__item-btn-ended';
        activeText = 'More details';
      } else if (this.selectedProducts.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeClass = this.classNameActive;
        activeText = this.labelCheckout;
      }

      htmlCatalog += `
        <li class="shop-area__item">
          <div>
            <a href="#">
              <img class="shop-area__item-img" src=${img} alt=${name}>
            </a>
            <div class="shop-area__text-info">
              <a href="#" class="shop-area__item-name">${name}</a>
              <p class="shop-area__item-brand">${brand}</p>
            </div>
          </div>
          <div class="shop-area__buy">
            <div class="shop-area__cart-area">
              ${this.setPrice(price)}
              <button class="shop-area__item-btn ${activeClass}"
                ${this.onClickProdBtnHandler(id, amount)}>
                ${activeText}
              </button>
            </div>
            ${this.availability(amount)}
          </div>
        </li>
      `;
    }

    this.parent.innerHTML = `
      <ul class="shop-area__list">
        ${htmlCatalog}
      </ul>
    `;
  }
}

const prod = new Products();

prod.render();
