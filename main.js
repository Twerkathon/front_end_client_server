$(document).ready(function () {

	var getOrigin = function(){
		return "BOS";
	}

	var getDestination = function(){
		// array of 
		return ["LAX","NCE","FPO"];
	}

	var getDepartureDateCar= function(depDate){
		return depDate;
	}

	var getDepartureDateFlight = function(depDate) {
		// THIS DOESN'T WORK YET
		flexible = true;
		// thinking that we could give it the first and last dates for the flexible range if the user chooses flexible
		if (flexible == true){
			var first = new Date(depDate);
			var last = new Date(depDate);
			first.setDate(first.getDate()-3);
			last.setDate(last.getDate()+3)
			var fyyyy = first.getFullYear().toString();
			var fmm = (first.getMonth()+1).toString();
			var fdd  = first.getDate().toString();
			var lyyyy = last.getFullYear().toString();
			var lmm = (last.getMonth()+1).toString();
			var ldd  = last.getDate().toString();


			var fmmChars = fmm.split('');
			var fddChars = fdd.split('');
			var lmmChars = lmm.split('');
			var lddChars = ldd.split('');

			// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
			var datestring = fyyyy + '-' + (fmmChars[1]?fmm:"0"+fmmChars[0]) + '-' + (fddChars[1]?fdd:"0"+fddChars[0]) + '--' + lyyyy + '-' + (lmmChars[1]?lmm:"0"+lmmChars[0]) + '-' + (lddChars[1]?ldd:"0"+lddChars[0]); 
			return datestring;
			// flexible or not
		}
		else{
			var datestring = depDate;
			return datestring;
		}

		
	}

	var getReturnDate = function() {
		return "2015-10-18";
	}

	var getMaxPrice = function(){
		return 5000;
	}

	// loop through the different destinations
	for (var i = 0; i < getDestination().length; i++) {
		flights = $.ajax({
		url: "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination()[i] + "&departure_date=" + getDepartureDateFlight("2015-09-10") + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
		dataType: 'json',
	}).done(function( data ){
		console.log(data);
	});

	car_rentals = $.ajax({
		url: "http://api.sandbox.amadeus.com/v1.2/cars/search-airport?location=" + getDestination()[i] + "&pick_up=" + getDepartureDateCar("2015-09-10") + "&drop_off=" + getReturnDate() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
		dataType: 'json',
	}).done(function( data ){
		console.log(data);
	});


	};


});


