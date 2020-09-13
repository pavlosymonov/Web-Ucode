class Products {

  constructor() {
    this.parent = document.getElementById('shop-area__catalog');
    this.labelAdd = 'Add to cart';
    this.labelCheckout = 'Checkout';
    this.classNameActive = 'shop-area__item-btn-active';
  }

  /**
   *
   * @param price {number, Array}
   * @returns {string}
   */
  setPrice(price) {
    if (typeof price === 'number') {
      return `
        <span class="shop-area__item-price">
          $<span itemprop="price">${price.toFixed(2)}</span>
        </span>
      `;
    }
    return `
      <div>
        <span class="old-price">$${price[1].toFixed(2)}</span>
        <span class="shop-area__item-price new-price" >
          $<span itemprop="price">${price[0].toFixed(2)}</span>
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

    cart.renderCartButton(products.length);
    setTimeout(() => cart.renderCart(), 200);
  }

  onClickProdBtnHandler(id, amount) {
    if (amount <= 0) {
      return ``;
    }
    return `onclick="prod.handleSetLocationStorage(this, '${id}')"`;
  }

  getRealNumberOfProds(catalog) {
    let numberOfProducts = sortAndShow.getSortValueFromLocalStorage(
      sortAndShow.selectShow[0], sortAndShow.selectShow[1]
    );

    if (numberOfProducts > catalog.length) {
      return catalog.length;
    }

    return numberOfProducts;
  }

  setNumberOfShowingProducts(catalog) {
    const numberOfShowingArea = document.getElementById('shop-area__option');
    let showingProducts = this.getRealNumberOfProds(catalog);

    numberOfShowingArea.textContent = `
      Showing 1—${showingProducts} of ${catalog.length} products
    `;
  }

  render(catalog = filters.workCatalog) {
    let htmlCatalog = '';
    const productsCatalog = sortAndShow.sortProductsCatalog(catalog);
    let data = pagination.paginData(productsCatalog,
        pagination.currentPage, +this.getRealNumberOfProds(productsCatalog));

    this.selectedProducts = localStorageUtil
      .getValue(localStorageUtil.keyNameProds);

    /*
      This cycle takes a certain number of elements,
      and then displays them in the product catalog.
      - showCount: number of products to show;
      - productsCatalog: copy of the sorted product catalog.
    */
    for (let i in data.trimmedData) {
      let { id, name, brand, price, img, amount } = data.trimmedData[i];
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
        <li class="shop-area__item" itemscope itemtype="http://schema.org/Product">
          <div>
            <a href="#" itemprop="url">
              <img itemprop="image" class="shop-area__item-img" src="${img}" alt="${name}">
            </a>
            <div class="shop-area__text-info">
              <a href="#" class="shop-area__item-name">
                <span itemprop="name">${name}</span>
              </a>
              <p itemprop="brand" class="shop-area__item-brand">${brand}</p>
            </div>
          </div>
          <div class="shop-area__buy" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
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

    if (data.trimmedData.length === 0) {
      this.parent.innerHTML = `
        <div class="empty-product-catalog">Oops, there's nothing here.</div>
      `;
    } else {
      this.parent.innerHTML = `
      <ul class="shop-area__list">
        ${htmlCatalog}
      </ul>
    `;
    }

    this.setNumberOfShowingProducts(productsCatalog);

    pagination.render(data.pages);
  }
}

const prod = new Products();
