$(document).ready(function () {

	var getOrigin = function(){
		return "BOS";
	}

	var getDestination = function(){
		// array of 
		return ["LAX","NCE","FPO"];
	}

	var getDepartureDate = function(){
		return "2015-09-08"
	}

	var getDepartureDateFlexible = function(depDate) {
		// THIS DOESN'T WORK YET
		// thinking that we could give it the first and last dates for the flexible range if the user chooses flexible


		var first = new Date(depDate);
		var last = new Date(depDate);
		first.setDate(first.getDate()-3);
		last.setDate(last.getDate()+3)
		return first.ToString("yyyy-mm-dd") + "--" + last.ToString("yyyy-mm-dd"); 
		// flexible or not
	}

	var getReturnDate = function() {
		return "2015-10-18";
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

	// var departure = 

	// for loop to loop through different destinations
	for (var i = 0; i < getDestination().length; i++) {
		flights = $.ajax({
		url: "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination()[i] + "&departure_date=" + getDepartureDateFlexible(getDepartureDate) + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
		dataType: 'json',
	}).done(function( data ){
		console.log(data);
	});

	car_rentals = $.ajax({
		url: "http://api.sandbox.amadeus.com/v1.2/cars/search-airport?location=" + getDestination()[i] + "&pick_up=" + getDepartureDate() + "&drop_off=" + getReturnDate() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
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


