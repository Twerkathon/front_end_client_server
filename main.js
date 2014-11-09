$(document).ready(function () {

	// var startDate = $("#startDate").val();
	// var endDate = $("#endDate").val();
	// console.log(endDate);

	var returnDate = '2014-12-20';
	var startDate = '2014-12-05';

	var getOrigin = function(){
		return "BOS";
	}

	var getDestination = function(){
		// array of 
		return ["MAD"];
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
		return returnDate;
	}

	var getMaxPrice = function(){
		return 5000;
	}
	var city_names = {"LHR":"London, UK","MAD":"Madrid, ES"};
	var recommendations = new Array();

	// console.log("http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination()[0] + "&departure_date=" + getDepartureDateFlight("2015-09-10") + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf")

	// loop through the different destinations
	for (var i = 0; i < getDestination().length; i++) {
		// console.log(getDestination()[i]);
		flights = $.ajax({
			url: "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=" + getOrigin() + "&destination=" + getDestination()[i] + "&departure_date=" + startDate + "&duration=1--30&max_price=" + getMaxPrice() + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
			dataType: 'json',
			}).done(function( data ){
				// console.log(data.results);
			// for (var i = 0; i < 3; i++) { //3 options for each destination, max.
				var json = {};
				// if (getDestination()[i] == "LHR"){
				// 	json.city = "London, UK";
				// }
				// else if (getDestination()[i] == "MAD"){
				// 	json.city = "Madrid, ES";
				// }
				json.city = "Madrid, ES";
				json.travelType = "flight";
				json.brand = data.results[0]["airline"];
				json.destination = data.results[0]["destination"];
				
				json.cost = data.results[0]["price"];
				json.departureDate = data.results[0]["departure_date"];
				// startDate = data.results[0]["departure_date"];
				// returnDate = data.results[0]["return_date"];

				var dep = new Date(startDate);
				var d = dep.toLocaleDateString();
				console.log(d);

				var ret = new Date(returnDate);
				var r = ret.toLocaleDateString();
				console.log(r);

				var flightBrand =  data.results[0]["airline"];
				$("#flightBrand").html(flightBrand);
				var flightDest = data.results[0]["destination"];
				$("#flightDest").html(flightDest);
				var flightCost = data.results[0]["price"];
				$("#flightCost").html('$' + flightCost);
				var flightDeparture = d; // data.results[0]["departure_date"];
				$("#flightDeparture").html(flightDeparture);
				var flightReturn = r; //data.results[0]["return_date"];
				$("#flightReturn").html(flightReturn);


				// console.log(json);
				return json;
		
				// console.log(json);
		
		});
			recommendations.push(flights);


		carRentals = $.ajax({
			url: "http://api.sandbox.amadeus.com/v1.2/cars/search-airport?location=" + getDestination()[i] + "&pick_up=" + startDate + "&drop_off=" + returnDate + "&apikey=nRLZ1a7XwQyUiepJflPOx1djGdUo9bGf",
			dataType: 'json',
			}).done(function( data ){
			// console.log(data);
			// for (var i = 0; i < 3; i++) { //3 options for each destination, max.
				var json = {};
				// if (getDestination()[i] == "LHR"){
				// 	json.city = "London, UK";
				// }
				// else if (getDestination()[i] == "MAD"){
				// 	json.city = "Madrid, ES";
				// }
				json.city = "Madrid, ES";
				json.travelType = "car_rental";
				json.brand = data.results[1]["provider"]["company_name"];
				json.destination = data.results[1]["airport"];
				
				json.cost = data.results[1]["cars"][1]["estimated_total"]["amount"];
				json.departureDate = startDate;
				json.returnDate = returnDate;

				var dep = new Date(startDate);
				var d = dep.toLocaleDateString();
				console.log(d);

				var ret = new Date(returnDate);
				var r = ret.toLocaleDateString();
				// console.log(r);


				var carCost = data.results[1]["cars"][1]["estimated_total"]["amount"];
				$("#carCost").html('$' + carCost);
				var carDest = data.results[1]["airport"];
				$("#carDest").html(carDest);
				var carBrand = data.results[1]["provider"]["company_name"];
				$("#carBrand").html(carBrand);
				var carDeparture = d; //getDepartureDateCar("2015-09-10");
				$("#carDeparture").html(carDeparture);
				var carReturn = r; //"2015-10-18";
				$("#carReturn").html(carReturn);

				// console.log(json);
				return json
			// };
		});

		recommendations.push(carRentals);	
	};
		
		// var carCost = recommendations[1].cost;
		// console.log(recommendations[1]);
		// document.getElementById("carCost").innerHTML(carCost);


	// final itinerary when they choose location
	var itinerary = {};


});


