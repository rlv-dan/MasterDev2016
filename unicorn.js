  Dashboard = {};

  Dashboard.DrawGoogleMaps = function (queryStrings){

	if (queryStrings.length > 0){

		var mapsSource = "https://www.google.com/maps/embed/v1/place?q=";

	for (i = 0; i < queryStrings.length; i++){

		mapsSource += queryStrings[1];

		if (i < queryStrings.length - 1){

			mapsSource += ',';

		}

	}
	 mapsSource += '&zoom=17&key=AIzaSyBqQX9KXcsnaFQkRszM8o0Zx3wA9jSRUwo';
	jQuery('#google-maps-iframe').attr('src', mapsSource);

	jQuery('#google-maps-iframe').show();

	}

  }
  
  
  $( document ).ready(function() {
    var queryStrings = ["hamburger", "beef", "bacon"];
  Dashboard.DrawGoogleMaps(queryStrings);
});
  	  
				
