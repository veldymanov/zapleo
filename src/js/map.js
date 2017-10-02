var map, 
zapleoLat = 48.430981, zapleoLng = 35.065359; //Zapleo's coordinates

function initialize() {
	var mapOptions = {
		zoom: 17,
		scrollwheel: false,
		disableDefaultUI: true,
		center: new google.maps.LatLng(zapleoLat, zapleoLng),
		/* Map's styles */
		styles: [{"featureType":"all","elementType":"all",
			"stylers":[{"visibility":"on"},{"hue":"#ffc000"}]},{"featureType":"all","elementType":"labels.text.fill",
			"stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke",
			"stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon",
			"stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill",
			"stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke",
			"stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry",
			"stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry",
			"stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill",
			"stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke",
			"stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry",
			"stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry",
			"stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry",
			"stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry",
			"stylers":[{"color":"#0f252e"},{"lightness":17}]}]
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
	var marker = new google.maps.Marker({
	position: {lat: zapleoLat, lng: zapleoLng},
	map: map,
	animation: google.maps.Animation.DROP,
	title: 'Zapleo Soft'
	});
}

google.maps.event.addDomListener(window, 'load', initialize);