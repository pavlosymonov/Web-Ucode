
/*
  Constructor function that allows you
  to create an unlimited number of tables
*/
function Table() {
  const table = buildTable();
  const headCells = table.querySelectorAll('th');

  headCells.forEach((th, i) => {
    const clickListener = getClickEvent(i);
    th.addEventListener('click', clickListener);
  });

  /*
    Closure function, called when you click
    on the cell by which we want to sort
  */
  function getClickEvent(cell) {
    let isAsc = cell === 0 ? true : false;

    return function () {
      isAsc = !isAsc;
      let rows = Array.from(table.rows).slice(1)
        .sort((row1, row2) => {
          const a = row1.cells[cell].innerHTML;
          const b = row2.cells[cell].innerHTML;
          return cell === 0 ? sortByNames(a, b) : sortByNumbers(a, b);
        });

      if (!isAsc) rows = rows.reverse();
      rows.forEach((row) => table.tBodies[0].appendChild(row));
      changeStatus(table.rows[0].cells[cell].innerHTML, 
        isAsc ? "ASC" : "DESC");
    };
  }

  function sortByNumbers(row1, row2) {
    return row1 - row2;
  }

  function sortByNames(row1, row2) {
    return row1 > row2 ? 1 : -1;
  }

  function changeStatus(param, order) {
    let status = document.querySelector('.notification');
    status.innerHTML = `Sorting by ${param}, order: ${order}`;
  }

  /*
    The function creates a table based on the values
    that come from the object. It also contains
    several sub-functions.

    - Returns the created table.
  */
  function buildTable() {
    let table = createTable();
    let heroes = [
      {Name: "Black Panther", Strength: 66, Age: 53},
      {Name: "Captain America", Strength: 79, Age: 137},
      {Name: "Captain Marvel", Strength: 97, Age: 26},
      {Name: "Hulk", Strength: 80, Age: 49},
      {Name: "Iron Man", Strength: 88, Age: 48},
      {Name: "Spider-Man", Strength: 78, Age: 16},
      {Name: "Thanos", Strength: 99, Age: 1000},
      {Name: "Thor", Strength: 95, Age: 1000},
      {Name: "Yon-Rogg", Strength: 73,Age: 52}
    ];
    
    function createTable() {
      let mainBlock = document.querySelector('main');
      let table = document.createElement('table');
      let status = document.createElement('div');

      mainBlock.append(table);
      status.className = 'notification';
      status.innerHTML = 'Sorting by Name, order: ASC';
      mainBlock.append(status);
      return table;
    }
    
    function generateTableHead(table, data) {
      let thead = table.createTHead();
      let row = thead.insertRow();
    
      for (let key of data) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
    
        th.appendChild(text);
        row.appendChild(th);
      }
    }
    
    function generateTableContent(table, data) {
      let tbody = document.createElement('tbody');
      
      for (let element of data) {
        let row = tbody.insertRow();
    
        for (key in element) {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
      table.append(tbody);
    }
    
    let data = Object.keys(heroes[0]);
    generateTableHead(table, data);
    generateTableContent(table, heroes);
    return table;
  }
}

new Table();
