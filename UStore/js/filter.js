class Filters {
  constructor() {
    this.parent = document.getElementById('shop-area__filters');
    this.maxPrice = 0;
    this.minPrice = Number.MAX_VALUE;
    this.activeFilters = {
      "price": [],
      "brands": [],
      "availability": "All"};
  }

  priceFilter(prod) {
    if (filters.activeFilters.price.length === 0) {
      return true;
    }

    const price = Array.isArray(prod.price) ? prod.price[0] : prod.price;

    return price >= filters.activeFilters.price[0] &&
      price <= filters.activeFilters.price[1];
  }

  availableFilter(prod) {
    if (filters.activeFilters.availability === "Not available") {
      if (prod.amount <= 0) {
        return true;
      }
      return false;
    } else if (filters.activeFilters.availability === "Available") {
      if (prod.amount > 0) {
        return true;
      }
      return false;
    }
    return true;
  }

  brandsFilter(prod) {
    if (filters.activeFilters.brands.length !== 0) {
      return filters.activeFilters.brands.includes(prod.brand);
    }
    return true;
  }

  renderProductsByFilters() {
    filters.workCatalog = searchForm.catalog.filter((prod) =>
      filters.priceFilter(prod) &&
      filters.availableFilter(prod) &&
      filters.brandsFilter(prod));

    prod.render(filters.workCatalog);
  }

  findProdsByPriceRange(minPrice, maxPrice) {
    let res = [];
    
    searchForm.catalog.forEach(el => {
      let price = typeof el.price === 'object' ? el.price[0] : el.price;

      if (price >= minPrice && price <= maxPrice) {
        res.push(el);
      }
    });

    return res;
  }

  setCountOfActiveFilters() {
    const countItem = document.querySelector('.filters-button__counter');
    let count = 0;

    for (let key in filters.activeFilters) {
      if (Array.isArray(filters.activeFilters[key]) &&
          filters.activeFilters[key].length !== 0) {
        count++;
      } else if (typeof filters.activeFilters[key] === 'string' &&
          filters.activeFilters[key] !== 'All') {
        count++;
      }
    }

    countItem.textContent = count;
  }

  handleCollapse(el) {
    if (!el.parentNode.classList.contains('collapse-opened')) {
      el.parentNode.classList.add('collapse-opened');
    } else {
      el.parentNode.classList.remove('collapse-opened');
    }
  }

  handleRangeInput() {
    let firstSlider = parseFloat(filters.ranges[0].value),
      secondSlider = parseFloat(filters.ranges[1].value);
    let percentLeft = 0;
    let percentRight = 0;

    if (firstSlider > secondSlider) {
      [firstSlider, secondSlider] = [secondSlider, firstSlider];
    }
    
    filters.numbers[0].innerHTML = `$${firstSlider.toFixed(2)}`;
    filters.numbers[1].innerHTML = `$${secondSlider.toFixed(2)}`;
    
    percentLeft = ((firstSlider - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
    percentRight = ((secondSlider - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;

    filters.filedRange.style.left = percentLeft + "%";
    filters.filedRange.style.right = (100 - percentRight) + "%";

    filters.activeFilters.price = [firstSlider, secondSlider];

    filters.renderProductsByFilters();

    filters.createListOfBrands(searchForm.catalog.filter((prod) =>
      filters.priceFilter(prod) && filters.availableFilter(prod)));

    filters.createListOfAvailables(searchForm.catalog.filter((prod) =>
      filters.priceFilter(prod) && filters.brandsFilter(prod)));

    filters.setCountOfActiveFilters();
  }

  handleCheckedBrends(input) {
    let index = 0;

    if ((index = filters.activeFilters.brands.indexOf(input.value)) == -1) {
      filters.activeFilters.brands.push(input.value);
    } else {
      filters.activeFilters.brands.splice(index, 1);
    }

    filters.renderProductsByFilters();

    filters.createListOfAvailables(searchForm.catalog.filter((prod) =>
      filters.priceFilter(prod) && filters.brandsFilter(prod)));

    filters.setCountOfActiveFilters();
  }

  handleAvailability(input) {
    filters.activeFilters.availability = input.value;

    filters.renderProductsByFilters();

    filters.createListOfBrands(searchForm.catalog.filter((prod) =>
      filters.priceFilter(prod) && filters.availableFilter(prod)));

    filters.setCountOfActiveFilters();
  }

  createListOfBrands(prods = searchForm.catalog) {
    let html = '';
    let list = document.getElementById('brands__list');
    let brands = {"Brandix": 0, "Zosch": 0, "Wakita": 0,
      "WeVALT": 0, "Hammer": 0, "Mitasia": 0, "Hart": 0,
      "Patta": 0, "Ryobi": 0, "Bosch": 0};

    prods.forEach(el => brands[el.brand]++);
    
    for (let key in brands) {
      let disabled = '';
      let checked = '';
      let count = '';
      let disabledClass = '';

      if (filters.activeFilters.brands.indexOf(key) !== -1) {
        checked = ' checked';
      }
      
      if (brands[key] === 0) {
        disabled = ' disabled';
        disabledClass = ' filter__item-disabled';
      } else {
        count = `<span class="filter__item-count">${brands[key]}</span>`;
      }

      html += `
        <label class="filter__item${disabledClass}">
          <span class="filter__check-container">
            <input type="checkbox" value=${key}
              class="filter__check-input"
              onclick="filters.handleCheckedBrends(this)"
              ${disabled}
              ${checked}>
            <span class="filter__check-span"></span>
          </span>
          <span class="filter__item-title">${key}</span>
          ${count}
        </label>
      `;
    }

    list.innerHTML = html;
  }

  createListOfAvailables(prods = searchForm.catalog) {
    let html = '';
    let list = document.getElementById('available__list');
    let amount = {"All": 0, "Available": 0, "Not available": 0};

    prods.forEach(el => {
      if (el.amount > 0) {
        amount.Available++;
      } else {
        amount["Not available"]++;
      }
      amount.All++;
    });
    
    for (let key in amount) {
      let disabled = '';
      let checked = '';
      let count = '';
      let disabledClass = '';

      if (filters.activeFilters.availability === key) {
        checked = ' checked';
      }
      
      if (amount[key] === 0) {
        disabled = ' disabled';
        disabledClass = ' filter__item-disabled';
      } else {
        count = `<span class="filter__item-count">${amount[key]}</span>`;
      }

      html += `
        <label class="filter__item${disabledClass}">
          <span class="filter__check-container">
            <input type="radio" value="${key}" name="availability"
              class="filter__check-input"
              onchange="filters.handleAvailability(this)"
              ${disabled}
              ${checked}>
            <span class="filter__check-span filter__radio-span"></span>
          </span>
          <span class="filter__item-title">${key}</span>
          ${count}
        </label>
      `;
    }

    list.innerHTML = html;
  }

  renderPriceFilter() {
    let el = document.createElement('div');
    el.classList.add('collapse-item', 'collapse-opened');
    
    this.workCatalog.forEach(el => {
      let price = typeof el.price === 'object' ? el.price[0] : el.price;

      if (price > this.maxPrice) {
        this.maxPrice = price + 100;
      }

      if (price < this.minPrice) {
        this.minPrice = price;
      }
    });

    el.innerHTML = `
      <button type="button" class="filter__title"
        onclick="filters.handleCollapse(this)">
        Price
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" class="filter__arrow">
          <path d="M.286.273a.92.92 0 00-.01 1.292l5.24 5.428 5.241-5.428a.92.92 0 00-.01-1.292.923.923 0 00-1.31.006L5.516 4.296 1.596.279A.923.923 0 00.286.273z"></path>
        </svg>
      </button>
      <div class="filter-body">
        <div class="filter__range-container">
          <input value=${this.minPrice}
            min=${this.minPrice} max=${this.maxPrice} step="10" type="range"
            oninput="filters.handleRangeInput()"/>
          <input value=${this.maxPrice}
            min=${this.minPrice} max=${this.maxPrice} step="10" type="range"
            oninput="filters.handleRangeInput()"/>
          <div class="filter-range"></div>
        </div>
        <div class="filter-price__title">
          Price:
          <span class="filter-price__value"></span>
          –
          <span class="filter-price__value"></span>
        </div>
      </div>
    `;

    this.parent.append(el);

    this.ranges = this.parent.querySelectorAll("input[type=range]"),
    this.numbers = this.parent.querySelectorAll(".filter-price__value");
    this.filedRange = this.parent.querySelector(".filter-range");

    this.numbers[0].innerHTML = `$${Number(this.ranges[0].value).toFixed(2)}`;
    this.numbers[1].innerHTML = `$${Number(this.ranges[1].value).toFixed(2)}`;
  }

  renderBrandFilter() {
    let el = document.createElement('div');
    el.classList.add('collapse-item', 'collapse-opened');

    el.innerHTML = `
      <button type="button" class="filter__title"
        onclick="filters.handleCollapse(this)">
        Brand
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" class="filter__arrow">
          <path d="M.286.273a.92.92 0 00-.01 1.292l5.24 5.428 5.241-5.428a.92.92 0 00-.01-1.292.923.923 0 00-1.31.006L5.516 4.296 1.596.279A.923.923 0 00.286.273z"></path>
        </svg>
      </button>
      <div class="filter-body">
        <div id="brands__list" class="brands__list"></div>
      </div>
    `;

    this.parent.append(el);

    this.createListOfBrands();
  }

  renderAvailableFilter() {
    let el = document.createElement('div');
    el.classList.add('collapse-item', 'collapse-opened');

    el.innerHTML = `
      <button type="button" class="filter__title"
        onclick="filters.handleCollapse(this)">
        Availability
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" class="filter__arrow">
          <path d="M.286.273a.92.92 0 00-.01 1.292l5.24 5.428 5.241-5.428a.92.92 0 00-.01-1.292.923.923 0 00-1.31.006L5.516 4.296 1.596.279A.923.923 0 00.286.273z"></path>
        </svg>
      </button>
      <div class="filter-body">
        <div id="available__list" class="available__list"></div>
      </div>
    `;

    this.parent.append(el);

    this.createListOfAvailables();
  }

  render() {
    this.workCatalog = searchForm.catalog;

    this.parent.innerHTML = '';

    this.renderPriceFilter();

    this.renderBrandFilter();

    this.renderAvailableFilter();
  }
}

const filters = new Filters();
