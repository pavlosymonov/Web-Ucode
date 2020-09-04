class LocalStorageUtil {
  constructor() {
    this.keyNameSorts = 'sorts';
    this.keyNameProds = 'products';
  }

  getValue(name) {
    const valueLocalStorage = localStorage.getItem(name);

    if (valueLocalStorage !== null) {
      return JSON.parse(valueLocalStorage);
    }

    return [];
  }

  putProducts(id) {
    let products = this.getValue(this.keyNameProds);
    let pushProduct = false;
    const index = products.indexOf(id);

    if(index === -1) {
      products.push(id);
      pushProduct = true;
    } else {
      products.splice(index, 1);
    }

    localStorage.setItem(this.keyNameProds, JSON.stringify(products));

    return { pushProduct, products }
  }

  putSorts(sort, number) {
    let arr = [sort, number];

    localStorage.setItem(this.keyNameSorts, JSON.stringify(arr));
  }
}

const localStorageUtil = new LocalStorageUtil();
