
// Model
var locations = [
        {
            title: 'Lincoln Center',
            location: {
                lat: 40.7725,
                lng: -73.9835
            },
            marker: null
        },
        {
            title: 'MOMA',
            location: {
                lat: 40.7614,
                lng: -73.9776
            },
            marker: null
        },
        {
            title: 'Whitney Museum',
            location: {
                lat: 40.7396,
                lng: -74.0089
            },
            marker: null
        },
        {
            title: 'Carnegie Hall',
            location: {
                lat: 40.7651,
                lng: -73.9799
            },
            marker: null
        },
        {
            title: 'Met Museum',
            location: {
                lat: 40.7794,
                lng: -73.9632
            },
            marker: null
        }
];

var map;
var markers = [];

// View Model

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: locations[3].location
    });
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });

        markers.push(marker);
        locations[i].marker = marker;
    }
}

var ViewModel = function() {
    var self = this;

    this.allLocations = ko.observableArray(locations);

    this.setCenter = function(place) {
        map.setCenter(place.location);

    }

    this.filteredLocations = ko.observableArray();

    this.allLocations().forEach(function(place) {
        self.filteredLocations.push(place);
    });

    this.filter = ko.observable('');

    this.filterLocations = function () {
        self.filteredLocations.removeAll();
        markers = [];

        self.allLocations().forEach(function (place) {
            place.marker.setVisible(false);
            var filterItem = self.filter().toLowerCase();
            var placeName = place.title.toLowerCase();

            if (placeName.indexOf(filterItem) >= 0) {
                self.filteredLocations.push(place);
                place.marker.setVisible(true);
                place.marker.setAnimation(google.maps.Animation.DROP);
            }
        });
    }
}
ko.applyBindings(new ViewModel());
