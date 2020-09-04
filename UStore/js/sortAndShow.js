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
    let sortName = this
      .getSortValueFromLocalStorage(this.selectSort[0], this.selectSort[1]);

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

  render() {
    this.parent.innerHTML = `
      <div id="shop-area__option" class="shop-area__option">Showing 1—6 of 16 products</div>
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
  }
}

const sortAndShow = new SortAndShow();
