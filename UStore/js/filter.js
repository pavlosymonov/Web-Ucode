class Filters {
  constructor() {
    this.parent = document.getElementById('shop-area__filters');
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
  }

  handleCollapse(el) {
    if (!el.parentNode.classList.contains('collapse-opened')) {
      el.parentNode.classList.add('collapse-opened');
    } else {
      el.parentNode.classList.remove('collapse-opened');
    }
  }

  render() {
    this.maxPrice = 0;
    this.minPrice = Number.MAX_VALUE;
    
    CATALOG.forEach(el => {
      let price = typeof el.price === 'object' ? el.price[0] : el.price;

      if (price > this.maxPrice) {
        this.maxPrice = price + 100;
      }

      if (price < this.minPrice) {
        this.minPrice = price;
      }
    });

    this.parent.innerHTML += `
      <div class="collapse-item collapse-opened">
        <button type="button" class="filter__title"
          onclick="filters.handleCollapse(this)">
          Price
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" class="filter__arrow">
            <path d="M.286.273a.92.92 0 00-.01 1.292l5.24 5.428 5.241-5.428a.92.92 0 00-.01-1.292.923.923 0 00-1.31.006L5.516 4.296 1.596.279A.923.923 0 00.286.273z"></path>
          </svg>
        </button>
        <div class="filter-body">
          <div class="filter__range-container">
            <input value="0"
              min="0" max=${this.maxPrice} step="10" type="range"
              oninput="filters.handleRangeInput()"/>
            <input value=${this.maxPrice}
              min="0" max=${this.maxPrice} step="10" type="range"
              oninput="filters.handleRangeInput()"/>
            <div class="filter-range"></div>
          </div>
          <div class="filter-price__title">
            Price:
            <span class="filter-price__value">$946.00</span>
            –
            <span class="filter-price__value">$2311.00</span>
          </div>
        </div>
      </div>
    `;

    this.ranges = this.parent.querySelectorAll("input[type=range]"),
    this.numbers = this.parent.querySelectorAll(".filter-price__value");
    this.filedRange = this.parent.querySelector(".filter-range");

    this.numbers[0].innerHTML = `$${Number(this.ranges[0].value).toFixed(2)}`;
    this.numbers[1].innerHTML = `$${Number(this.ranges[1].value).toFixed(2)}`;
  }
}

const filters = new Filters();