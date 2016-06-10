Dashboard = {};

Dashboard.DrawGoogleMaps = function (queryStrings) {

	if (queryStrings.length > 0) {

		var mapsSource = "https://www.google.com/maps/embed/v1/place?q=";

		for (i = 0; i < queryStrings.length; i++) {

			mapsSource += queryStrings[1];

			if (i < queryStrings.length - 1) {

				mapsSource += ',';

			}

		}
		mapsSource += '&zoom=17&key=AIzaSyBqQX9KXcsnaFQkRszM8o0Zx3wA9jSRUwo';
		jQuery('#google-maps-iframe').attr('src', mapsSource);

		jQuery('#google-maps-iframe').show();

	}

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
	var queryStrings = ["banana", "apple", "cheese"];
	Dashboard.DrawGoogleMaps(queryStrings);
	Dashboard.StartSoundcloud(queryStrings);
});
