
// Model
var locations = [
        {
            title: 'Lincoln Center',
            position: {
                lat: 40.7725,
                lng: -73.9835
            },
            marker: null,
            content: null
        },
        {
            title: 'MOMA',
            position: {
                lat: 40.7614,
                lng: -73.9776
            },
            marker: null,
            content: null
        },
        {
            title: 'Whitney Museum',
            position: {
                lat: 40.7396,
                lng: -74.0089
            },
            marker: null,
            content: null
        },
        {
            title: 'Carnegie Hall',
            position: {
                lat: 40.7651,
                lng: -73.9799
            },
            marker: null,
            content: null
        },
        {
            title: 'Met Museum',
            position: {
                lat: 40.7794,
                lng: -73.9632
            },
            marker: null,
            content: null
        }
];

var map;

// View Model

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: locations[3].position
    });

    ko.applyBindings(new ViewModel());
}

// Get info from New York Times API
var nyTimesArticles = function (location, infoWindow, marker) {
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytUrl += '?' + $.param({
        'api-key': "44aad7b8bb1043c494f83b4ecc6509ab",
        'q': location.title,
        'sort': "newest",
        'page': 5
    });
    $.ajax({
        url: nytUrl,
        method: 'GET',
    }).done(function(data) {
        var content = '<h3 class="text-center">New York Times Articles About' +
        location.title + '</h3><ul>';
        var articles = data.response.docs;
        $.each(articles, function(key) {
            var article = articles[key];
            content += '<li class="col-md-9">' + '<a href="' +
                        article.web_url + '">' + article.headline.main +
                        '</a>' + '</p>' + '</li>';
        });
        content += '</ul>';
        infoWindow.setContent(content);
        infoWindow.open(map, marker);

    }).fail(function() {
        infoWindow.setContent('New York Times Articles Not Found');
        infoWindow.open(map, marker);
    });
};

var ViewModel = function() {
    var self = this;

    // create inital arrays to hold all locations
    this.allLocations = ko.observableArray(locations);

    // create array that will hold filtered locations
    this.filteredLocations = ko.observableArray();
    this.allLocations().forEach(function(location) {
        self.filteredLocations.push(location);
    });

    // Creates the info window object
    var infoWindow = new google.maps.InfoWindow();

    // Sets the marker to bounce for a period of time

    this.bounceMarker = function(location) {
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){
            location.marker.setAnimation(null);
        }, 1440);
    };


    // generates markers for the map
    this.allLocations().forEach(function(location) {
        var marker = new google.maps.Marker({
            map: map,
            position: location.position,
            title: location.title,
            animation: google.maps.Animation.DROP
        });

        // opens an info window when a marker is clicked
        marker.addListener('click', function() {
            self.bounceMarker(location);
            nyTimesArticles(location, infoWindow, marker);
        });

        location.marker = marker;
    });

    // resets the center of the maps when a location is clicked
    this.setCenter = function(location) {
        map.setCenter(location.position);
        self.bounceMarker(location);
        nyTimesArticles(location, infoWindow, location.marker);
    };

    // the text entered into the search filter
    this.filter = ko.observable('');

    // filters out locations that don't meet the search criteria
    this.filterLocations = function () {
        self.filteredLocations.removeAll();

        self.allLocations().forEach(function (location) {
            location.marker.setVisible(false);
            var filterItem = self.filter().toLowerCase();
            var locationName = location.title.toLowerCase();

            if (locationName.indexOf(filterItem) >= 0) {
                self.filteredLocations.push(location);
                location.marker.setVisible(true);
                location.marker.setAnimation(google.maps.Animation.DROP);
            }
        });
    };

    // forces the display of location button when hamburger is clicked
    this.showItems = ko.observable(false);

    this.showMenu = function () {
        if (this.showItems() === false) {
            this.showItems(true);
        } else {
            this.showItems(false);
        }
    };
};
