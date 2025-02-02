// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.8, lng: 2.3},
        zoom: 6
    });
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('You are here.');
            map.setCenter(pos);

            var geocoder = new google.maps.Geocoder;

            geocoder.geocode({'location': pos}, function (results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        map.setZoom(11);
                        var marker = new google.maps.Marker({
                            position: pos,
                            map: map
                        });
                        var address = results[0].formatted_address.split(',');
                        var street = address[0];
                        var city = address[1].split(' ')[2];
                        var zip_code = address[1].split(' ')[1];
                        var country = address[2];
                        document.getElementById('map_city').value = city;
                        document.getElementById('map_street').value = street;
                        document.getElementById('map_zip_code').value = zip_code;
                        document.getElementById('map_country').value = country;

                        infoWindow.setContent(results[1].formatted_address);
                        infoWindow.open(map, marker);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });



        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function setLocation(){
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.8, lng: 2.3},
        zoom: 6
    });
    var infoWindow = new google.maps.InfoWindow({map: map});
    var geocoder = new google.maps.Geocoder();
    var address = String(document.getElementById("map_street").value) + ", " + String(document.getElementById("map_city").value) + " " + String(document.getElementById("map_zip_code").value) + ", " + String(document.getElementById("map_country").value);
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            map.setZoom(11);
            infoWindow.setContent(address);
            infoWindow.open(map, marker);


        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}

document.getElementById('form_map').addEventListener('submit',setLocation);



