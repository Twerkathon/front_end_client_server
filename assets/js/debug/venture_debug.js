/*!  - v1.0.0
 * https://github.com/Twerkathon/front_end_client_server
 * Copyright (c) 2014; * Licensed GPLv2+ */
jQuery(document).ready(function($) {

	$('section').hide();

	$('.current').show();

	$('.nextButton').click(function() {
	    $('.current').removeClass('current').hide()
	        .next().fadeIn().addClass('current');
	    if ($('.current').hasClass('last')) {
	        $('.nextButton').attr('disabled', true);
	    }
	    $('backButton').attr('disabled', null);
	});

	$('.backButton').click(function() {
	    $('.current').removeClass('current').hide()
	        .prev().fadeIn().addClass('current');
	    if ($('.current').hasClass('first')) {
	        $('.backButton').attr('disabled', true);
	    }
	    $('.nextButton').attr('disabled', null);
	});
});