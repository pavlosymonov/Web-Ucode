const chartArea = document.getElementById('chart'),
  chartStats = document.getElementById('chart-stats');

const compareList = new Set();

const stats = {
  "intelligence": true, "strength": false, "speed": true,
  "durability": false, "power": true, "combat": false
}

function createChart(arr) {
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(arr);

    let chart = new google.charts.Bar(chartArea);

    chart.draw(data);
  }
}

function createListOfStats() {
  let html = '';

  for (let stat in stats) {
    html += `
      <label>
        ${stat}
        <input
          onclick="addOrRemoveChartStat(this)"
          type="checkbox"
          name="stat"
          value="${stat}"
          ${stats[stat] ? 'checked' : ''}>
      </label>
    `;
  };

  chartStats.innerHTML = `
    <div class="stats-list">
      <p>Select stats to compare</p>
      ${html}
    </div>
  `;
}

function addOrRemoveChartStat(statInput) {
  const stat = statInput.getAttribute('value');

  stats[stat] = !stats[stat];
  showChart(compareList);
}

function showChart() {
  const chartArr = [arrayOfStats(), ...arrayOfHeroesStats()];

  createChart(chartArr);
}

function arrayOfStats() {
  const result = [''];

  for (const stat in stats) {
    if (!stats[stat]) continue;
    result.push(stat);
  }
  return result;
}

function arrayOfHeroesStats() {
  const result = [];

  compareList.forEach(hero => {
    const { powerstats } = hero;
    const statsArr = [hero.name];

    for (let stat in stats) {
      if (!stats[stat]) continue;
      if (powerstats[stat] == null) statsArr.push(0);
      else statsArr.push(+powerstats[stat]);
    }
    result.push(statsArr);
  });

  return result;
}