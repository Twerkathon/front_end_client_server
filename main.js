$(document).ready(function () {

	var getOrigin = function(){
		return "BOS";
	}

	var getDestination = function(){
		// array of 
		
		// SHERRIE
		var dest = $('#formSubmit').click(function(){
			var e = document.getElementById('temperature');
			var strUser = e.options[selectedIndex].text;
			console.log(strUser);
			if (strUser == 'warm'){
				var dest = ["MAD"];
			}
			else if (strUser == 'cold'){
				var dest = ["LHR"];
			}
			return dest;
		});

		return dest;

	}

	var getDepartureDateCar= function(depDate){
		return depDate;
	}

	var getDepartureDateFlight = function(depDate) {
		// THIS WORKS NOW	
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
		// SHERRIE
		return "2015-10-18";
	}

	var getMaxPrice = function(){
		return 5000;
	}
	var city_names = {"LHR":"London, UK","MAD":"Madrid, ES"};
	var recommendations = new Array();

	console.log("http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination()[0] + "&departure_date=" + getDepartureDateFlight("2015-09-10") + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf")

	// loop through the different destinations
	for (var i = 0; i < getDestination().length; i++) {
		console.log(getDestination()[i]);
		flights = $.ajax({
			url: "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination()[i] + "&departure_date=" + getDepartureDateFlight("2015-09-10") + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
			dataType: 'json',
			}).done(function( data ){
				console.log(data.results);
			// for (var i = 0; i < 3; i++) { //3 options for each destination, max.
				var json = {};
				if (getDestination()[i] == "LHR"){
					json.city = "London, UK";
				}
				else if (getDestination()[i] == "MAD"){
					json.city = "Madrid, ES";
				}
				json.travelType = "flight";
				json.brand = data.results[0]["airline"];
				json.destination = data.results[0]["destination"];
				
				json.cost = data.results[0]["price"];
				json.departureDate = data.results[0]["departure_date"];
				json.returnDate = data.results[0]["return_date"];
				console.log(json);
				return json;
		
				// console.log(json);
		
		});
			recommendations.push(flights);

		carRentals = $.ajax({
			url: "http://api.sandbox.amadeus.com/v1.2/cars/search-airport?location=" + getDestination()[i] + "&pick_up=" + getDepartureDateCar("2015-09-10") + "&drop_off=" + getReturnDate() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
			dataType: 'json',
			}).done(function( data ){
			// console.log(data);
			// for (var i = 0; i < 3; i++) { //3 options for each destination, max.
				var json = {};
				if (getDestination()[i] == "LHR"){
					json.city = "London, UK";
				}
				else if (getDestination()[i] == "MAD"){
					json.city = "Madrid, ES";
				}
				json.travelType = "car_rental";
				json.brand = data.results[1]["provider"]["company_name"];
				json.destination = data.results[1]["airport"];
				
				json.cost = data.results[1]["cars"][1]["estimated_total"]["amount"];
				json.departureDate = getDepartureDateCar("2015-09-10")
				json.returnDate = "2015-10-18"
				console.log(json);
				return json
			// };
		});

		recommendations.push(carRentals);	
	};
		console.log(recommendations)

	// final itinerary when they choose location
	var itinerary = {};


});


