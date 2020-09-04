class Search {
  constructor() {
    this.parent = document.getElementById('site-header__search');
  }

  /**
   * @param nameForSort {string}
   * @returns {Array}
   */
  getProductsByName(nameForSort) {
    let result = [];

    CATALOG.forEach(elem => {
      if (elem.name.toLowerCase().search(nameForSort.toLowerCase()) !== -1) {
        result.push(elem);
      }
    });
    return result;
  }

  printListFoundProds() {
    let inputValue = searchForm.searchInput.value;

    if (inputValue) {
      prod.render(searchForm.getProductsByName(inputValue));
    } else {
      prod.render();
    }
  }

  render() {
    this.parent.innerHTML = `
      <div class="search__form">
        <input
          name="search"
          placeholder="Search over 10,000 products"
          aria-label="Site search"
          type="text"
          class="search__input">
        <button type="button" class="search__button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="">
            <path d="M19.2 17.8s-.2.5-.5.8c-.4.4-.9.6-.9.6s-.9.7-2.8-1.6c-1.1-1.4-2.2-2.8-3.1-3.9-1 .8-2.4 1.3-3.9 1.3-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7c0 1.5-.5 2.9-1.3 4 1.1.8 2.5 2 4 3.1 2.3 1.7 1.5 2.7 1.5 2.7zM8 3C5.2 3 3 5.2 3 8s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"></path>
          </svg>
        </button>
      </div>
    `;

    this.searchInput = document.querySelector('.search__input');

    this.searchInput.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        searchForm.printListFoundProds();
      }
    });

    document.querySelector('.search__button')
      .addEventListener('click', searchForm.printListFoundProds);
  }
}

const searchForm = new Search();
