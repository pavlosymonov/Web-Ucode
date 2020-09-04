class Pagination {
  constructor() {
    this.parent = document.getElementById('shop-area__pagination');
    this.currentPage = 1;
    this.numberOfPaginationBtns = 5;
    this.disabledClass = 'disabled';
  }

  /**
   * 
   * @param {Array} catalog 
   * @param {number} currentPage 
   * @param {number} prodsPerPage 
   * @returns {object} Object with new trimmed catalog and number of pages
   */
  paginData(catalog, currentPage, prodsPerPage) {
    let trimStart = (currentPage - 1) * prodsPerPage;
    let trimEnd = trimStart + prodsPerPage;
    let trimmedData = catalog.slice(trimStart, trimEnd);
    let pages = Math.ceil(catalog.length / prodsPerPage);

    return {
      trimmedData,
      pages
    };
  }

  handlePageClick(elem) {
    this.currentPage = +elem.value;
    prod.render();
  }

  handleOnClickNextPrevPage(elem) {
    this.currentPage = elem.value === 'prev-page'? this.currentPage - 1
    : this.currentPage + 1;
    prod.render();
  }

  render(pages) {
    this.parent.innerHTML = ``;

    if (pages) {
      let disablePrevClass = '';
      let disableNextClass = '';

      if (this.currentPage == 1) {
        disablePrevClass = ` ${this.disabledClass}`;
      } else if (this.currentPage == pages) {
        disableNextClass = ` ${this.disabledClass}`;
      }

      this.parent.innerHTML += `
        <button value="prev-page" ${disablePrevClass}
          class="shop-area__pag-btn shop-area__pag-btn-arrow${disablePrevClass}"
          onclick="pagination.handleOnClickNextPrevPage(this)">
          <svg width="8" height="13">
            <path d="M7.7 12.7c-.4.4-.9.4-1.3 0L0 6.5 6.4.3c.4-.4.9-.3 1.3 0 .4.4.4 1 0 1.3l-5 4.9 5 4.9c.4.4.4 1 0 1.3z"></path>
          </svg>
        </button>
      `;

      for (let i = 1; i <= pages; i++) {
        let activeClass = '';
  
        if (i === this.currentPage) {
          activeClass = ' shop-area__pag-btn-active';
        }
        
        this.parent.innerHTML += `
          <button value=${i} class="shop-area__pag-btn${activeClass}"
            onclick="pagination.handlePageClick(this)">
            ${i}
          </button>
        `;
      }

      this.parent.innerHTML += `
        <button value="next-page" ${disableNextClass}
        class="shop-area__pag-btn shop-area__pag-btn-arrow${disableNextClass}"
        onclick="pagination.handleOnClickNextPrevPage(this)">
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13">
          <path d="M.3 11.4l5-4.9-5-4.9C-.1 1.2-.1.7.3.3s.9-.4 1.3 0L8 6.5l-6.4 6.2c-.4.4-.9.3-1.3 0s-.4-.9 0-1.3z"></path>
        </svg>
        </button>
      `;
    }
  }
}

const pagination = new Pagination();
