/* Author:
Sherrie Gonzalez
*/

jQuery(document).ready(function($) {

	$('section, .backButton').hide();

	$('.current').show();

	$('.nextButton').click(function() {
	    $('.current').removeClass('current').hide()
	        .next().fadeIn().addClass('current');
	        $('.backButton').show();
	    if ($('.current').hasClass('last')) {
	        $('.nextButton').attr('disabled', true);
	    }
	    $('backButton').attr('disabled', null);
	});

	$('.backButton').click(function() {
	    $('.current').removeClass('current').hide()
	        .prev().fadeIn().addClass('current');
	    if ($('.current').hasClass('first')) {
	    	$('.backButton').hide();
	        $('.backButton').attr('disabled', true);
	    }
	    $('.nextButton').attr('disabled', null);
	});

	$('.toggleCheck').click(function() {
		var toggleClass = $(this).attr('id');
		$('.' + toggleClass + '-options').slideToggle();
	});

	$('.placeOptions li').click(function() {
	    $('.placeOptions li').removeClass('selected');
	    $(this).addClass('selected');
	});
});