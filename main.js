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
		var fyyyy = first.getFullYear().toString();
		var fmm = first.getMonth().toString();
		var fdd  = first.getDate().toString();
		var lyyyy = last.getFullYear().toString();
		var lmm = last.getMonth().toString();
		var ldd  = last.getDate().toString();


		var fmmChars = fmm.split('');
		var fddChars = fdd.split('');
		var lmmChars = lmm.split('');
		var lddChars = ldd.split('');

		// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
		var datestring = fyyyy + '-' + (fmmChars[1]?fmm:"0"+fmmChars[0]) + '-' + (fddChars[1]?fdd:"0"+fddChars[0]) + '--' + lyyyy + '-' + (lmmChars[1]?lmm:"0"+lmmChars[0]) + '-' + (lddChars[1]?ldd:"0"+lddChars[0]);
		// if (fmm.length < 2){
		// 	console.log(fmm);
		// 	fmm = '0' + fmm;
		// 	// var date= fyyyy + '-0' + fmm + '-' + fdd + "--" + lyyyy + '-' + lmm + '-' + ldd; 
		// } 
		// if ( fdd.length < 2 ){
		// 	console.log(fdd);
		// 	fdd = '0' + fdd;

		// }	
		// if (lmm.length < 2 ){
		// 	console.log(lmm);
		// 	lmm = '0' + lmm;
		// }
		
		// if (ldd.length < 2) {
		// 	console.log(ldd);
		// 	ldd = '0' + ldd;
		// }
		// // } else{
		// // 	// var date= fyyyy + '-' + fmm + '-' + fdd + "--" + lyyyy + '-' + lmm + '-' + ldd; 
		// // };

		// var date= fyyyy + '-' + fmm + '-' + fdd + "--" + lyyyy + '-' + lmm + '-' + ldd; 
		return datestring;
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


