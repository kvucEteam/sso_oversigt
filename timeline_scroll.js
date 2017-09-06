
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


function TEST_position_and_offset_printout(){
	var selectorArr = ['.container-fluid', '#interface'];

	var pos, off;

	var HTML = '';
	HTML += '<tabel>';
	HTML += 	'</thead>';
	HTML += 		'<tr><th>Selector</th><th>pos.left</th><th>off.left</th></tr>';
	HTML += 	'</thead>';
	HTML += 	'<tbody>';
	for (var n in selectorArr) {
		pos = $(selectorArr[n]).position();
		off = $(selectorArr[n]).offset();
		HTML += 	'<tr><td>'+selectorArr[n]+'</td><td>'+pos.left+'</td><td>'+off.left+'</td></tr>';
	}
	HTML += '	</tbody>';
	HTML += '</tabel>';

	console.log('TEST_position_and_offset_printout - HTML: ' + HTML);

	$('#interface').append(HTML);
}

function TEST_position_and_offset_printout2(){
	var selectorArr = ['.container-fluid', '#interface'];

	var pos, off;

	var HTML = '';
	HTML += '<tabel>';
	HTML += 	'</thead>';
	HTML += 		'<tr><th>Selector</th><th>pos.left</th><th>off.left</th></tr>';
	HTML += 	'</thead>';
	HTML += 	'<tbody>';
	for (var n in selectorArr) {
		pos = $(selectorArr[n]).position();
		off = $(selectorArr[n]).offset();
		HTML += 	'<tr><td>'+selectorArr[n]+'</td><td>'+pos.left+'</td><td>'+off.left+'</td></tr>';
	}
	HTML += '	</tbody>';
	HTML += '</tabel>';

	console.log('TEST_position_and_offset_printout - HTML: ' + HTML);

	$('#interface').append(HTML);
}


scrollCallback = function() {
	console.log('scrollCallback - CALLED');

	if (typeof(pos_start)==='undefined') {

		window.scrollHeight = $('body').height();
		window.windowHeight = $(window).height();
		window.sliderContainerWidth = $('#sliderContainer').width();
		var sliderWidth_calc = sliderContainerWidth*windowHeight/scrollHeight;
		console.log('onScroll - scrollHeight: ' + scrollHeight + ', windowHeight: ' + windowHeight + ', sliderContainerWidth: ' + sliderContainerWidth + ', sliderWidth_calc: ' + sliderWidth_calc);

		$('#slider').width(sliderWidth_calc);

		window.pos_start = $( "#slider" ).position();
		window.off_start = $( "#slider" ).offset();
		window.sliderWidth = $('#slider').width();
		
	}

	window.bodyPos = $(window).scrollTop();

	// console.log('onScroll - sliderContainerWidth: ' + sliderContainerWidth + ', sliderWidth: ' + sliderWidth + ', scrollHeight: ' + scrollHeight + ', windowHeight: ' + windowHeight);
	
	// var posPercent = (bodyPos + windowHeight)/scrollHeight;
	var posPercent = (bodyPos + 0)/scrollHeight;
	console.log('onScroll - bodyPos: ' + bodyPos + ', scrollHeight: ' + scrollHeight + ', posPercent: ' + posPercent);

	$('.slider').css({left: posPercent*sliderContainerWidth});
}


// Denne event-litsner virker men "document" og "window" som samme referance kan der måske opstå problemer med i nogle browsere...
$( document ).on('scroll', window, scrollCallback);




// $( window ).scroll(function() {
// 	console.log('onScroll - CALLED');
// 	window.bodyPos = $(window).scrollTop();

// 	// console.log('onScroll - sliderContainerWidth: ' + sliderContainerWidth + ', sliderWidth: ' + sliderWidth + ', scrollHeight: ' + scrollHeight + ', windowHeight: ' + windowHeight);
	
// 	// var posPercent = (bodyPos + windowHeight)/scrollHeight;
// 	var posPercent = (bodyPos + 0)/scrollHeight;
// 	console.log('onScroll - bodyPos: ' + bodyPos + ', scrollHeight: ' + scrollHeight + ', posPercent: ' + posPercent);

// 	$('#slider').css({left: posPercent*sliderContainerWidth});
// });


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


$( "#slider" ).draggable({ 
		containment: "#sliderContainer", 
		scroll: false,
		start: function(event, ui) {
            console.log('slider - START - CALLED');

            // $( document ).off('scroll', window, scrollCallback);

        },
		drag: function(event, ui) {
            console.log('slider - DRAG - CALLED');

            // $( document ).off('scroll', window, scrollCallback);

            var id = $(this).prop('id');
            var pos = $(this).position();
            var off = $(this).offset();

            console.log('slider - DRAG - id: ' + id + ', pos: ' + JSON.stringify(pos) + ', offset: ' + JSON.stringify(off));

            console.log('slider - DRAG - pos.left: ' + pos.left + ', pos_start.left: ' + pos_start.left + ', sliderContainerWidth: ' + sliderContainerWidth + ', sliderWidth: ' + sliderWidth);
            console.log('slider - DRAG - off.left: ' + off.left + ', off_start.left: ' + off_start.left + ', sliderContainerWidth: ' + sliderContainerWidth + ', sliderWidth: ' + sliderWidth);

            // var widthPercent = (pos.left - pos_start.left)/(sliderContainerWidth - sliderWidth);
            // var widthPercent = (off.left - pos_start.left)/(sliderContainerWidth - sliderWidth);
            // var widthPercent = Math.abs(pos.left - pos_start.left)/(sliderContainerWidth - sliderWidth);
            var widthPercent = (off.left - off_start.left)/(sliderContainerWidth - sliderWidth);
            console.log('slider - widthPercent: ' + widthPercent);

            widthPercent = widthPercent*(scrollHeight - windowHeight);
            console.log('slider - DRAG - sliderContainerWidth: ' + sliderContainerWidth + ', sliderWidth: ' + sliderWidth + ', scrollHeight: ' + scrollHeight + ', windowHeight: ' + windowHeight);

            $( "body" ).scrollTop( widthPercent);  // <--------  VIRKER NÆSTEN :-)
            // $( "#interface" ).scrollTop( widthPercent); // <--------  VIRKER IKKE
            
        },
        stop: function(event, ui) {
            console.log('slider - STOP - CALLED');

            // $( document ).on('scroll', window, scrollCallback);
        },
	});



$(window).resize(function() {
	
});



$(document).ready(function() {

	// console.log('timeline - jsonData: ' + JSON.stringify(jsonData));

	main();

	if (typeof(pos_start)==='undefined') {

		window.scrollHeight = $('body').height();
		window.windowHeight = $(window).height();
		window.sliderContainerWidth = $('#sliderContainer').width();
		var sliderWidth_calc = sliderContainerWidth*windowHeight/scrollHeight;
		console.log('onScroll - scrollHeight: ' + scrollHeight + ', windowHeight: ' + windowHeight + ', sliderContainerWidth: ' + sliderContainerWidth + ', sliderWidth_calc: ' + sliderWidth_calc);

		// $('#slider').width(sliderWidth_calc);

		window.pos_start = $( "#slider" ).position();
		window.off_start = $( "#slider" ).offset();
		window.sliderWidth = $('#slider').width();
		
	}
	

	// $( "body" ).scrollTop( 10000 );  // <--------  VIRKER IKKE

	TEST_position_and_offset_printout();

});