Dashboard = {};

Dashboard.DrawGoogleMaps = function (queryStrings) {

	if (queryStrings.length > 0) {

		var googleCallback = function callback(results, status) {

			// Utility for creating map markers
			function createMarker(place) {
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
						map : map,
						position : place.geometry.location
					});

				google.maps.event.addListener(marker, 'click', function () {
					infowindow.setContent(place.name);
					infowindow.open(map, this);
				});
			}

			if (status === google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i]);
				}
			}
		}

	}

	var hqLocation = {
		lat : 55.7093099,
		lng : 13.1904653
	};

	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location : hqLocation,
		radius : 5000,
		type : queryStrings
	}, googleCallback);

}

Dashboard.StartSoundcloud = function (queryStrings) {

	SC.initialize({
		client_id : '3cd307677fafba599fa214baa7ea622c'
	});

	var scQuery = {};

	scQuery.q = "";

	for (i = 0; i < queryStrings.length; i++) {

		scQuery.q += queryStrings[1];

		if (i < queryStrings.length - 1) {

			scQuery.q += ',';

		}

	}

	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', scQuery).then(function (tracks) {
		console.log(tracks);

		if (tracks.length > 0) {

			var trackUri = tracks[0].uri;

			var widgetSource = "https://w.soundcloud.com/player/?url=" + trackUri + "&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"

				jQuery('#soundcloud-widget').attr('src', widgetSource);

			jQuery('#soundcloud-widget').show();

		}

	});

}

$(document).ready(function () {

	function checkVariable() {

		if (typeof google !== 'undefined') {
			var queryStrings = ["restaurant", "apple", "cheese"];
			Dashboard.DrawGoogleMaps(queryStrings);
			Dashboard.StartSoundcloud(queryStrings);
		}
	}

	setTimeout(checkVariable, 100);

});
