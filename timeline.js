
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
	coordnateSystemSelector('#interface');

	addData();
	
	// makeResponsive2();
	makeResponsive_simple();
}

function addData(){
	var d;
	if (jsonData.hasOwnProperty('data')) {
		for (var y in jsonData.data) {
			for (var x in jsonData.data[y]) {
				d = jsonData.data[y][x];
				console.log('addData - d: ' + JSON.stringify(d));
				$('.y'+y).append('<div class="dataBlock" style="position: absolute; left: '+d.left+'; background-color: '+d.backgroundColor+'; color: '+d.color+'; width: '+d.width+'">'+((d.hasOwnProperty('text'))?d.text:'')+'</div>');  
			}
		}
	}
}




function coordnateSystemSelector(target) {

	var HTML = '';
	if (jsonData.hasOwnProperty('axis')) {
		HTML += coordnateSystem(jsonData.axis.x, jsonData.axis.y);    // VANDRET 
		// HTML += coordnateSystem(jsonData.axis.y, jsonData.axis.x); // LORDET

		// HTML += coordnateSystem2(jsonData.axis.x, jsonData.axis.y);    // VANDRET 
		// HTML += coordnateSystem(jsonData.axis.y, jsonData.axis.x); // LORDET
	}
	console.log('coordnateSystemSelector - HTML: ' + HTML);

	$(target).html(HTML);
}


function coordnateSystem(xDim, yDim) {
	var HTML = '';
	HTML += '<div class="coord">';
		for (var y = 0; y < yDim; y++) {
			HTML += '<div class="coordRow">';
			for (var x = 0; x < xDim; x++) {
				// HTML += '<div class="coordCell">c</div>';
				HTML += '<div class="coordCell">&nbsp;</div>';
			};
			HTML += '</div>';
		};
	HTML += '</div>';

	HTML += '<div class="coord_overlay">';
		for (var y = 0; y < yDim; y++) {
			HTML += '<div class="coordRow_overlay y'+String(yDim-1-y)+'">';

			// HTML += '&nbsp;';

			// for (var x = 0; x < xDim; x++) {
			// 	// HTML += '<div class="coordCell">c</div>';
			// 	HTML += '<div class="coordCell">&nbsp;</div>';
			// };
			HTML += '</div>';
		};
	HTML += '</div>';

	return HTML;
}


function coordnateSystem2(xDim, yDim) {
	var HTML = '';
	HTML += '<div class="coordContainer">';
		HTML += '<div class="coordAxis coordAxis_y">';
			for (var y = 0; y < yDim; y++) {
				HTML += '<div class="coordAxisCell_y">y</div>';
			}
		HTML += '</div>';
		HTML += '<div class="coord">';
			for (var y = 0; y < yDim; y++) {
				HTML += '<div class="coordRow">';
				for (var x = 0; x < xDim; x++) {
					// HTML += '<div class="coordCell">c</div>';
					HTML += '<div class="coordCell">&nbsp;</div>';
				};
				HTML += '</div>';
			};
		HTML += '</div>';
		HTML += '<div class="coordAxis coordAxis_x">';
			for (var x = 0; x <= xDim; x++) {
				HTML += '<div class="coordAxisCell_x">x</div>';
			}
		HTML += '</div>';
	HTML += '</div>';

	return HTML;
}


function makeResponsive_simple(){
	var ratio = 1/3;
	var width = $('.coord').width();
	var height = $('.coord').height();
	console.log('makeResponsive_simple - width 1: ' + width + ', height 1: ' + height);

	$('.coord').height(width*ratio);

	$('.coord_overlay').width(width);
	$('.coord_overlay').height(width*ratio);
	console.log('makeResponsive_simple - width 2: ' + width + ', height 2: ' + height);

	var pos = $('.coord').offset();
	console.log('makeResponsive_simple - pos: ' + JSON.stringify(pos) + ', typeof(pos.top): ' + typeof(pos.top));
	$('.coord_overlay').css({left: pos.left, top: pos.top+4});

	$('.dataBlock').css({height: $('.coordRow_overlay').height(), 'line-height': $('.coordRow_overlay').height()+'px', 'text-align': 'center'});
}


function makeResponsive2() {

	var calenderUnitScale = 16/9;
	var xDim = jsonData.axis.x;
	var yDim = jsonData.axis.y;
	console.log('makeResponsive2 - xDim: ' + xDim + ', yDim: ' + yDim);

	var cellWidth, cellHeight;

	$('.coord').each(function( index, element ) {
	// $('.coordContainer').each(function( index, element ) {
		var width = $(element).width();
		var height = $(element).height();
		console.log('makeResponsive2 - width: ' + width + ', height: ' + height);

		// var ajust = ($('.coordCell', element).outerWidth() - $('.coordCell', element).width());
		var ajust = parseFloat(($('.coordCell', element).css('borderWidth')).replace('px', ''))*1;
		cellWidth = 100/(xDim+0); // - ajust/width;
		// cellHeight = height/(yDim+0); // - ajust/height;
		cellHeight = 100/(yDim+0); // - ajust/height;
		console.log('makeResponsive2 - cellWidth: ' + cellWidth + ', cellHeight: ' + cellHeight + ', ajust: ' + ajust);

		// $('.coordCell', element).css({width: cellWidth});
		$('.coordCell', element).css({width: cellWidth+'%', height: cellHeight+'%', 'line-height': cellHeight+'%', 'text-align': 'center', 'margin': '0%'});

		$('.coordRow_data', element).css({width: cellWidth+'%', 'line-height': cellHeight+'%', 'text-align': 'center', 'margin': '0%'});


		$('.coordAxisCell_y', element).css({width: cellWidth+'%', height: cellHeight+'%', 'line-height': cellHeight+'%', 'text-align': 'center'});
	});
}


$(window).resize(function() {
	// makeResponsive();
	// makeResponsive2();

	makeResponsive_simple();
});


$(document).ready(function() {

	console.log('timeline - jsonData: ' + JSON.stringify(jsonData));

	main();

});