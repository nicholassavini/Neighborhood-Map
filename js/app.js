function initMap() {
    var locations = [
          {title: 'Lincoln Center', location: {lat: 40.7725, lng: -73.9835}},
          {title: 'MOMA', location: {lat: 40.7614, lng: -73.9776}},
          {title: 'Whitney Museum', location: {lat: 40.7396, lng: -74.0089}},
          {title: 'Carnegie Hall', location: {lat: 40.7651, lng: -73.9799}},
          {title: 'Met Museum', location: {lat: 40.7794, lng: -73.9632}}
        ];
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 40.7725, lng: -73.9835}
    });

}
