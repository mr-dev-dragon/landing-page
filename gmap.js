var mapLocation = new google.maps.LatLng(45.200, -72.4310); //change coordinates here
//data-lat="<?php echo esc_attr($lat); ?>" data-lng=

var mapLocation = new google.maps.LatLng(parseFloat(jQuery('#map').data('lat')), parseFloat(jQuery('#map').data('lng'))); //change coordinates here

var marker;
var map;



if (jQuery('#map').length) {
    google.maps.event.addDomListener(window, 'load', initialize);
}

