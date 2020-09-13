class SortAndShow {

  constructor() {
    this.parent = document.getElementById('shop-area__sorts-area');
    this.sortLowPrice = 'price_low';
    this.sortHighPrice = 'price_high';
  }

  getSortValueFromLocalStorage(index, elem) {
    const sorts = localStorageUtil.getValue(localStorageUtil.keyNameSorts);

    if (sorts.length !== 0) {
      return sorts[index];
    } else {
      return elem.options[elem.selectedIndex].value;
    }
  }

  handleSortsState() {
    const selectSort = this.selectSort[1];
    const selectShow = this.selectShow[1];
    let sortName = selectSort.options[selectSort.selectedIndex].value;
    let numberToShow = selectShow.options[selectShow.selectedIndex].value;

    pagination.currentPage = 1;
    localStorageUtil.putSorts(sortName, numberToShow);
    prod.render();
  }

  sortByLowPrice(a, b) {
    if (typeof a.price === 'object' && typeof b.price === 'object') {
      return a.price[0] > b.price[0] ? 1 : -1;
    } else if (typeof b.price === 'object') {
      return a.price > b.price[0] ? 1 : -1;
    } else if (typeof a.price === 'object') {
      return a.price[0] > b.price ? 1 : -1;
    }

    return a.price > b.price ? 1 : -1;
  }

  sortProductsCatalog(catalog) {
    let result = JSON.parse(JSON.stringify(catalog));
    let sortName = this.getSortValueFromLocalStorage(
      this.selectSort[0], this.selectSort[1]
    );

    switch (sortName) {
      case sortAndShow.sortHighPrice:
        return result.sort(sortAndShow.sortByLowPrice).reverse();
      case sortAndShow.sortLowPrice:
        return result.sort(sortAndShow.sortByLowPrice);
      default:
        return result;
    }
  }

  setSelectedSelectOption(selectArr) {
    const select = selectArr[1].getElementsByTagName('option');

    for (let i = 0; i < select.length; i++) {
      if (select[i].value === this.getSortValueFromLocalStorage(
        selectArr[0],
        selectArr[1])
      ) {
        select[i].selected = true;
      }
    }
  }

  eventHendling() {
    const container = document.getElementById('shop-area__filters-container');

    document.querySelector('.shop-area__filters-btn')
      .addEventListener('click', () => {
      container.classList.add('filters-container--open');
      bodyOverflow('hidden', '17px');
    });

    document.querySelector('.filters__overlay').addEventListener('click', () => {
      container.classList.remove('filters-container--open');
      bodyOverflow('auto', '0');
    });

    document.querySelector('.filters__close').addEventListener('click', () => {
      container.classList.remove('filters-container--open');
      bodyOverflow('auto', '0');
    });
  }

  render() {
    this.parent.innerHTML = `
      <button type="button" class="shop-area__filters-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="filters-button__icon">
          <path d="M7 14v-2h9v2H7zm7-7h2v2h-2V7zm-1.5-1c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5h-2c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h2zM7 2h9v2H7V2zM5.5 5h-2c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5zM0 2h2v2H0V2zm9 7H0V7h9v2zm-7 5H0v-2h2v2zm1.5-3h2c.3 0 .5.2.5.5v3c0 .3-.2.5-.5.5h-2c-.3 0-.5-.2-.5-.5v-3c0-.3.2-.5.5-.5z"></path>
        </svg>
        <span class="filters-button__title">Filters</span>
        <span class="filters-button__counter">0</span>
      </button>
      <div id="shop-area__option" class="shop-area__option"></div>
      <div class="view-options__divider"></div>
      <div class="shop-area__sorts">
        <div class="shop-area__sort-by">
          <span>Sort By</span>
          <select id="sort-by-price" class="shop-area__select controls"
            onchange="sortAndShow.handleSortsState()">
            <option value="default">Default</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
        <div class="shop-area__show">
          <span>Sort By</span>
          <select
              id="show-how-many"
              class="shop-area__select controls"
              onchange="sortAndShow.handleSortsState()">
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
          </select>
        </div>
      </div>
    `;

    this.selectSort = [0, document.getElementById('sort-by-price')];
    this.selectShow = [1, document.getElementById('show-how-many')];

    this.setSelectedSelectOption(this.selectSort);
    this.setSelectedSelectOption(this.selectShow);

    this.eventHendling();
  }
}

const sortAndShow = new SortAndShow();
