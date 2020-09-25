function createMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZHVtYWdlbm9uIiwiYSI6ImNrZmlkcjY1OTE3YWcycm8zYXFpdGhzaDYifQ.jvKHR9uQpnj_Rq5vQakVtg';
  let coordinates = document.getElementById('coordinates');

  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [165.973, -50.604167],
    zoom: 13
  });

  map.on('move', () => {
    let { lng, lat } = map.getCenter();

    coordinates.innerHTML = `Longitude: ${lng}<br />Latitude: ${lat}`;
  });

  let marker = new mapboxgl.Marker({
    draggable: true
  }).setLngLat([165.973, -50.604167]).addTo(map);

// Add search control to the map.

  const search = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  });

  map.addControl(search);

  search.on('result', () => {
    marker?.remove();
  });

// Add geolocate control to the map.

  const geo = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  });

  map.addControl(geo);

  geo.on('trackuserlocationstart', e => {
    marker?.remove();
  });

  geo.on('trackuserlocationend', () => {
    let { lng, lat } = map.getCenter();

    marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([lng, lat]).addTo(map);
  });

// Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());
}

createMap();
