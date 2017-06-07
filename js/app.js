
// Model
var locations = [
        {
            title: 'Lincoln Center',
            location: {
                lat: 40.7725,
                lng: -73.9835
            },
            display: true
        },
        {
            title: 'MOMA',
            location: {
                lat: 40.7614,
                lng: -73.9776
            },
            display: true
        },
        {
            title: 'Whitney Museum',
            location: {
                lat: 40.7396,
                lng: -74.0089
            },
            display: true
        },
        {
            title: 'Carnegie Hall',
            location: {
                lat: 40.7651,
                lng: -73.9799
            },
            display: true
        },
        {
            title: 'Met Museum',
            location: {
                lat: 40.7794,
                lng: -73.9632
            },
            display: true
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
    }
}

var ViewModel = function() {
    var self = this;

    this.allLocations = ko.observableArray(locations);

    this.setCenter = function(place) {
        map.setCenter(place.location);
    }

    this.filterLocations = ko.pureComputed({
        read: function() { return this.allLocations(); },
        write: function(value) {
            for (var i = 0; i < self.allLocations().length; i++) {
                var currentLocation = self.allLocations()[i].title;
                if (currentLocation.indexOf(value) == -1) {
                    self.allLocations()[i].display = false;
                } else {
                    self.allLocations()[i].display = true;

                }
            }
        },
        owner: this
    });
}
ko.applyBindings(new ViewModel());
