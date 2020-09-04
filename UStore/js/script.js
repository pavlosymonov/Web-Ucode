function render() {
  searchForm.render();

  sortAndShow.render();

  prod.render();

  cart.renderCartButton(localStorageUtil
    .getValue(localStorageUtil.keyNameProds).length);
  cart.renderCart();
}

let CATALOG = [];

fetch('catalog.json')
  .then(res => res.json())
  .then(body => {
    CATALOG = body;
    render();
  })
  .catch(error => console.log(error));
