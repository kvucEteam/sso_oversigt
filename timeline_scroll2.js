
//=========================================
// 		Links to resources:
//=========================================
//
// Draggable containment:
// https://jqueryui.com/draggable/#constrain-movement
// 
// God metode til at centrer tekst vertikalt og horisontalt - se svar fra "Michiel van Oosterhout" 
// https://stackoverflow.com/questions/8865458/how-do-i-vertically-center-text-with-css


function main(){
	
}


function template() {

}

window.scrollHeight = $('body').height(); // This n
window.sliderContainerWidth = $('#sliderContainer').width();
window.sliderContainerWidth = $('#sliderContainer').width();


$( "#slider" ).draggable({ 
	containment: "#sliderContainer", 
	// scroll: false,
	start: function(event, ui) {
        console.log('slider - START - CALLED');
    },
	drag: function(event, ui) {
        console.log('slider - DRAG - CALLED');

        var pos = $(this).position();
        var off = $(this).offset();

        console.log('slider - DRAG - pos: ' + JSON.stringify(pos) + ', offset: ' + JSON.stringify(off));

        var widthPercent = pos.left/($(this).parent().width() - $(this).width());
        console.log('slider - widthPercent: ' + widthPercent);

        widthPercent = widthPercent*(scrollHeight - windowHeight);
        // $( "body" ).scrollTop( widthPercent);
        $( window ).scrollTop( widthPercent);

        // $('#sliderContainer').css({top: widthPercent});

    },
    stop: function(event, ui) {
        console.log('slider - STOP - CALLED');
    }
});


function scaleAndPosition_sliderContainer() {

	window.scrollHeight = $('body').height();
	window.windowHeight = $(window).height();
	console.log('document.ready - scrollHeight: ' + scrollHeight + ', windowHeight: ' + windowHeight + ', windowHeight/scrollHeight: ' + windowHeight/scrollHeight);


	$('#sliderContainer').width($('#outerContainer').width());

	window.sliderContainerWidth = $('#sliderContainer').width();

	var height = $('#sliderContainer').height();
	var off = $('#outerContainer').offset();
	console.log('scaleAndPosition_sliderContainer - height: ' + height + ', off: ' + JSON.stringify(off));

	$('#sliderContainer').css({top: off.top - height});

	$('#slider').width($('#sliderContainer').width()*windowHeight/(scrollHeight));
	$('#slider').height(height);
}



function slideToggleMenu() {
	$('.slideToggle_content').hide();

	$( document ).on('click', '.slideToggle_header', function(){
		console.log('slideToggleMenu - click - CALLED');
		
		$('.slideToggle_content').slideToggle();
	});
}



scrollCallback = function() {
	console.log('scrollCallback - CALLED');

	window.bodyPos = $(window).scrollTop();

	var posPercent = (bodyPos + 0)/scrollHeight;
	console.log('onScroll - bodyPos: ' + bodyPos + ', scrollHeight: ' + scrollHeight + ', posPercent: ' + posPercent);

	$('.slider').css({left: posPercent*sliderContainerWidth});
}


// Denne event-litsner virker men "document" og "window" som samme referance kan der måske opstå problemer med i nogle browsere...
$( document ).on('scroll', window, scrollCallback);


$( document ).on('mousedown', '#slider', function(){
	console.log('mousedown - CALLED');
	// $( document ).off('scroll', window, scrollCallback);
	$(this).addClass('slider_off').removeClass('slider'); 
});

$( document ).on('mouseup', 'body', function(){  // <---  IMPORTANT: "body" is nessary because the user may click on "#slider" and loose the cursor position ontop of the "#slider" as they drag - when mouseup performed, the cursor will no longer be ontop of the "#slider", and therefore the event "mouseup" will not work
	console.log('mouseup - CALLED');
	// $( document ).on('scroll', window, scrollCallback);
	$('#slider').addClass('slider').removeClass('slider_off');
});




$(window).resize(function() {
	scaleAndPosition_sliderContainer();
});



$(document).ready(function() {

	scaleAndPosition_sliderContainer();

	 slideToggleMenu();

	$( "#slider" ).css({left: 0}); // <------ This is a bugfix on the live server, that causes the "#slider" to be initialized outside "#sliderContainer". This moves the "#slider" to the start position.
});


// $(window).load(function() {
// 	// $( "#slider" ).css({left: 0});
// });