$(document).ready(function () {

	var getOrigin = function(){
		return "BOS";
	}

	var getDestination = function(){
		return ["LAX","NCE"];
	}

	var getDepartureDate = function() {
		return "2015-09-08--2015-10-12";
		// flexible or not
	}

	var getMaxPrice = function(){
		return 5000;
	}

	// var aggregationMode = function(){
	// 	return 
	// }

	// var concat = function(getOrigin, getDestination, getDepartureDate, getDuration, getMaxPrice) {
	// 	request = "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin + "&departure_date=" + getDepartureDate + "&duration=1--30&max_price=" + getMaxPrice + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf";
	// 	return request;
	// }
	for (var i = 0; i < getDestination().length; i++) {
		flights = $.ajax({
		url: "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination()[i] + "&departure_date=" + getDepartureDate() + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
		dataType: 'json',
	}).done(function( data ){
		console.log(data);
	});
	};
	// flights = $.ajax({
	// 	url: "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination() + "&departure_date=" + getDepartureDate() + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
	// 	dataType: 'json',
	// }).done(function( data ){
	// 	console.log(data);
	// });
	//console.log(flights);

});


