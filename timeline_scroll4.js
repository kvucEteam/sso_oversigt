
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

var fadeDone = true;
window.scrollHeight = $('body').height(); // This n
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

// var contentObj = {header: "...", columnContent: [{'video': videoObj1}, {'faq': faqObj}, {'checklist': checklistObj1}]}   faqObj =  {header, "....", } 
function makeGroupContainers(id, contentObj) {
	console.log('makeGroupContainers - CALLED');

	console.log('makeGroupContainers - contentObj: ' + JSON.stringify(contentObj));

	var HTML = "";
	HTML += '<div id="'+id+'" class="groupContainer blue">'; 
		if (contentObj.hasOwnProperty('header')){
			console.log('makeGroupContainers - A0');
			HTML += '<div class="groupColumn col-xs-12 col-md-12 blue"><h2>'+contentObj.header+'</h2></div>';
		} 
		var numOfColumns = contentObj.columnContent.length;
		var numOfBsColPrElement = 12/numOfColumns
		console.log('makeGroupContainers - numOfColumns: ' + numOfColumns + ', numOfBsColPrElement: ' + numOfBsColPrElement);

		for (var n in contentObj.columnContent) {
			HTML += '<div class="groupColumn">';  // col-xs-12 col-md-12
				HTML += '<div class="groupColumn col-xs-12 col-sm-'+numOfBsColPrElement+' blue">'; 
					var columnContent = String(Object.keys(contentObj.columnContent[n]));
					console.log('makeGroupContainers - columnContent: ' + columnContent + ', typeof(columnContent): ' + typeof(columnContent));

					console.log('makeGroupContainers - contentObj.columnContent['+n+']: ' + JSON.stringify(contentObj.columnContent[n]) );

					switch(columnContent) {
					    case 'faq':
					    	console.log('makeGroupContainers - A1');
					        HTML += makeSlideToggleMenus_faq(contentObj.columnContent[n].faq.header, contentObj.columnContent[n].faq);
					        break;
					    case 'checklist':
					    	console.log('makeGroupContainers - A2');
					        HTML += makeSlideToggleMenus_checklist(contentObj.columnContent[n].checklist);
					        break;
					    case 'formalia':
					    	console.log('makeGroupContainers - A2');
					        HTML += makeSlideToggleMenus_formalia(contentObj.columnContent[n].formalia);
					        break;
					    case 'video':
					    	console.log('makeGroupContainers - A3');
					    	HTML += makeVideoPlayThumbnail(contentObj.columnContent[n].video.thumbnailSrc, contentObj.columnContent[n].video.videoSrc);
					        break;
					    default:
					    	console.log('makeGroupContainers - A4');
					        // alert('ERROR');
					}

				HTML += '</div>';
			HTML += '</div>';
		}
	HTML += '</div>';

	return HTML;
}



function makeSlideToggleMenus_faq(header, faqObj) {
	console.log('makeSlideToggleMenus_faq - jsonData: ' + JSON.stringify(jsonData));

	var HTML = '';
	// HTML += '<div id="'+id+'" class="slideToggleMenu_outer slideToggleMenu">';
	HTML += '<div class="slideToggleMenu_outer slideToggleMenu">';
	// HTML += 	'<div class="slideToggle_header">'+header+'<span class="slideGlyph glyphicon glyphicon-chevron-down"></span></div>';
	HTML += 	'<h4 class="slideToggle_header"><span class="glyphicons glyphicons-show-thumbnails-with-lines"></span><div class="slideToggle_headerText">'+header+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
	HTML += 	'<div class="slideToggle_content">';
		for (var n in faqObj.faq) {
			HTML += '<div class="slideToggleMenu_inner slideToggleMenu">';
			HTML += 	'<h4 class="slideToggle_header"><div class="slideToggle_headerText">'+faqObj.faq[n][0]+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
			HTML += 	'<div class="slideToggle_content">'+faqObj.faq[n][1]+'</div>';
			HTML += '</div>';
		}
	HTML += 	'</div>';
	// HTML += 	'<div class="slideToggle_paddingElement">&nbsp;</div>';
	HTML += '</div>';
	console.log('makeSlideToggleMenus_faq - HTML: ' + HTML);

	return HTML;
}


function makeSlideToggleMenus_checklist(checklistObj) {
	console.log('makeSlideToggleMenus_checklist - checklistObj: ' + JSON.stringify(checklistObj));

	var HTML = '';
	HTML += '<div class="slideToggleMenu_outer slideToggleMenu">';
	HTML += 	'<h4 class="slideToggle_header"><span class="glyphicon glyphicon-ok"></span><div class="slideToggle_headerText">'+checklistObj.header+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
	HTML += 	'<div class="slideToggle_content">';
		for (var n in checklistObj.checklist) {
			HTML += '<div class="checklistItem"><span class="glyphicon glyphicon-ok"></span>'+checklistObj.checklist[n]+'</div>';
		}
	HTML += 	'</div>';
	HTML += '</div>';
	console.log('makeSlideToggleMenus_checklist - HTML: ' + HTML);

	return HTML;
}


function makeSlideToggleMenus_formalia(checklistObj) {
	console.log('makeSlideToggleMenus_formalia - checklistObj: ' + JSON.stringify(checklistObj));

	var HTML = '';
	HTML += '<div class="slideToggleMenu_outer slideToggleMenu">';
	HTML += 	'<h4 class="slideToggle_header"><span class="glyphicons glyphicons-paragraph-alt"></span><div class="slideToggle_headerText">'+checklistObj.header+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
	HTML += 	'<div class="slideToggle_content">';
		for (var n in checklistObj.checklist) {
			HTML += '<div class="checklistItem"><span class="glyphicons glyphicons-paragraph-alt"></span>'+checklistObj.checklist[n]+'</div>';
		}
	HTML += 	'</div>';
	HTML += '</div>';
	console.log('makeSlideToggleMenus_formalia - HTML: ' + HTML);

	return HTML;
}  // 




function makeVideoPlayBtn(btnText, id, videoSrc){
	return '<div id="'+id+'" class="videoPlayBtn btn btn-default btn-lg" role="button" data-videoSrc="'+videoSrc+'"><span class="glyphicon glyphicon-play"></span>'+btnText+'</div>';
}


function makeVideoPlayThumbnail(thumbnail, videoSrc){
	console.log('makeVideoPlayThumbnail - thumbnail: ' + thumbnail + ', videoSrc: ' + videoSrc);
	return '<div class="videoPlayThumbnail" role="button" data-videoSrc="'+videoSrc+'"><img class="img-responsive" src="'+thumbnail+'"></div>';
}


function UserMsgBox_video(src) {

    var HTML = '<div class="video embed-responsive embed-responsive-16by9 col-xs-12 col-md-12"><iframe class="embed-responsive-item" src="'+src+'?iv_load_policy=3&amp;modestbranding=1&amp;showinfo=0&amp;autohide=1&amp;rel=0" allowfullscreen="1" frameborder="0"></iframe></div>';
    UserMsgBox_xclick('body', HTML);

    $('.MsgBox_bgr').addClass('MsgBox_bgr_video');
    $('#UserMsgBox').attr('id', 'UserMsgBox_video');
    // $('.CloseClass').addClass('glyphicon-remove-circle').removeClass('glyphicon-remove');

    // $('.CloseClass').html('<span class="CloseClass_inner right glyphicon glyphicon-remove"></span>');  // TEST to see if it is possible to place a inner glyphicon-remove inside another...

    // $('MsgBox_bgr_video').hide().fadeIn();
}


$( document ).on('click', '.videoPlayBtn', function(){
	console.log('videoPlayBtn - CLICK - CALLED');
	var videoSrc = $(this).attr('data-videoSrc');

	// UserMsgBox_video('https://www.youtube.com/embed/-Go7min716I');
	UserMsgBox_video( videoSrc );
});


$( document ).on('click', '.videoPlayThumbnail', function(){
	console.log('videoPlayThumbnail - CLICK - CALLED');
	var videoSrc = $(this).attr('data-videoSrc');

	// UserMsgBox_video('https://www.youtube.com/embed/-Go7min716I');
	UserMsgBox_video( videoSrc );
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

	$('#slider').height(height);

	// $('#slider').width($('#sliderContainer').width()*windowHeight/(scrollHeight));
	// $('#slider').height(height);
}



function slideToggleMenu() {
	$('.slideToggle_content').hide(); 

	$( document ).on('click', '.slideToggle_header', function(){
		console.log('slideToggleMenu - click - CALLED');
		var jqThis = this;
		var parentObj = $(this).parent();
		$('> .slideToggle_content', parentObj).slideToggle(400, function() {
			if ($('> .slideGlyph', jqThis).hasClass('glyphicon-chevron-down')) {
				$('> .slideGlyph', jqThis).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
			} else {
				$('> .slideGlyph', jqThis).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			}
		});

		
		$('.slideToggleMenu_outer').each(function( index, element ) {
			$(element).css({'z-index': 0});
		});
		$(parentObj).closest('.slideToggleMenu_outer').css({'z-index': 1});


		slideToggleMenu_align_slideToggle_content();
		
	});
}


function slideToggleMenu_align_slideToggle_content() {
	console.log('slideToggleMenu_align_slideToggle_content - CALLED');
	
	var parentId, elementWidth, elementPosition;

	var parentWidth = $('#outerContainer').width();

	$('.slideToggle_content').each(function( index, element ) {
		parentId = $(element).parent().parent().attr('id');
		console.log('slideToggleMenu_align_slideToggle_content - parentId: ' + parentId);

		if (parentId == 'outerContainer') {  // Only if the slideToggle-menu is a "direct" child of "#outerContainer", then ajust the left-position of ".slideToggle_content":
			console.log('slideToggleMenu_align_slideToggle_content - A0');

			console.log('slideToggleMenu_align_slideToggle_content - element.id: ' + $(element).attr('id') + ', element.class: ' + $(element).attr('class')); 

			elementWidth = $(element).width();
			elementPosition = $(element).parent().position();
			console.log('slideToggleMenu_align_slideToggle_content - parentWidth: ' + parentWidth + ', elementWidth: ' + elementWidth + ', elementPosition: ' + JSON.stringify(elementPosition));

			if (parentWidth - elementPosition.left < elementWidth) {
				console.log('slideToggleMenu_align_slideToggle_content - A1');

				$(element).css({left: - (elementWidth - (parentWidth - elementPosition.left))});

				// $(element).css({'border-top-left-radius': '4px'});
			} else {
				// $(element).css({'border-top-left-radius': '0px'});
			}
		}
	});
}

// FROM: https://stackoverflow.com/questions/16778814/read-css-property-from-stylesheet
function propertyFromStylesheet(selector, attribute) {
    var value;

    [].some.call(document.styleSheets, function (sheet) {
        return [].some.call(sheet.rules, function (rule) {
            if (selector === rule.selectorText) {
                return [].some.call(rule.style, function (style) {
                    if (attribute === style) {
                        value = rule.style.getPropertyValue(attribute);
                        return true;
                    }

                    return false;
                });
            }

            return false;
        });
    });

    return value;
}
// console.log('propertyFromStylesheet: ' + propertyFromStylesheet(".slideToggleMenu", "font-size"));


// MARK 8/9 18:45


// This sets the "base font-size" for a collection of selectors based on the width of the viewport. 
// function slideToggleMenu_setFontSize() {
cssClass = {
	selectorObj: {
		'<=768px': {
			'.slideToggleMenu': {
				'font-size': '10px'
			}
		},
		'768px <= 1160px': {
			'.slideToggleMenu': {
				'font-size': '20px'
			}
		},
		'1160px <=': {
			'.slideToggleMenu': {
				'font-size': '20px'
			}
		}
	},

	preprocessor: function (selectorObj) {

		var opLookUp = {'=<':'(1)','<=':'(2)','=>':'(3)','>=':'(4)','<':'(5)','>':'(6)'};
		
		// var Twidth = $(window).width();
		var Twidth = parseInt($('.container-fluid').css('width').replace('px', ''));

		var pos, key_selected = null, count = 0;

		var TselectorObj = {};  // TselectorObj is a sanitiezed version of selectorObj, without spaces and "px".
		for (var key in selectorObj){
			var originalKey = key;
			key = key.replace(/ /g, '').replace(/px/g, '');
			TselectorObj[key] = selectorObj[key];

			var lowDim = null, highDim = null, dimFound = false;

			for (var op in opLookUp) {
				pos = key.indexOf(op);
				console.log('slideToggleMenu_setFontSize - x - pos: ' + pos + ', op: ' + op + ', key: ' + key + ', count: ' + count);

				if (pos!==-1) {
					lowDim = key.substring(0, pos);
					highDim = key.substring(pos+op.length);
					console.log('slideToggleMenu_setFontSize - x - lowDim 1: ' + lowDim + ', highDim 1: ' + highDim);

					lowDim = (lowDim=='')? null : lowDim;
					highDim = (highDim=='')? null : highDim;
					console.log('slideToggleMenu_setFontSize - x - lowDim 2: ' + lowDim + ', highDim 2: ' + highDim);

					key_selected = this.keySelector(op, originalKey, lowDim, highDim);
					console.log('slideToggleMenu_setFontSize - x - key_selected: ' + key_selected + ', Twidth: ' + Twidth);
				}

				++count;

				if ((key_selected!==null)) { // Break the first loop if key_selected is found...
					console.log('slideToggleMenu_setFontSize - x - break 1');
					break;
				}
			}

			if ((key_selected!==null)) { // Break the second loop if key_selected is found...
				console.log('slideToggleMenu_setFontSize - x - break 2');
				break;
			}
		}
		console.log('slideToggleMenu_setFontSize - x - final - key_selected: ' + key_selected);

		return key_selected;
	}, 


	// setCssFontSize(selectorObj, key_selected);


	getCss: function (selectorObj, key_selected) {
		return selectorObj[key_selected];
	},

	setCss: function () {

	},

	scaleFontSize: function (selectorObj, selectorArr) {
		console.log('scaleFontSize - CALLED');

		this.setBaseFontSize(selectorObj);
		this.scaleBaseFonts(selectorArr);
	},

	setBaseFontSize: function (selectorObj) {
		console.log('setBaseFontSize - CALLED');

		var key_selected = this.preprocessor( selectorObj );

		var propertyObj;

		for (var selector in selectorObj[key_selected]) {
			propertyObj = selectorObj[key_selected][selector]
			console.log('setBaseFontSize - selector: "' + selector + '", propertyObj: ' + JSON.stringify( propertyObj ));

			if (propertyObj.hasOwnProperty('font-size')){
				console.log('setBaseFontSize - font-size - FOUND');

				$(selector).attr('data-baseFontSize', propertyObj['font-size']);
			}
		}
	},

	scaleBaseFonts: function (selectorArr) {

		// var selectorArr = ['.slideToggle_header', '.slideToggle_content', '#videoPlayBtn1'];  

		var maxWidth = parseInt($('.container-fluid').css('max-width').replace('px', ''));
		var width = parseInt($('.container-fluid').css('width').replace('px', ''));

		var ratio = width/maxWidth;
		var percent = 100*ratio; 

		var fs;

		console.log('scaleBaseFonts - maxWidth: ' + maxWidth + ', width: ' + width + ', ratio: ' + ratio + ', percent: ' + percent);

		for (var n in selectorArr) {
			if (typeof($(selectorArr[n]).attr('data-baseFontSize')) === 'undefined') {
				console.log('scaleBaseFonts - selectorArr['+n+']: ' + selectorArr[n]); 
				$(selectorArr[n]).attr('data-baseFontSize', $(selectorArr[n]).css('font-size').replace('px', ''));
			}
			fs = parseInt($(selectorArr[n]).attr('data-baseFontSize').replace('px', '')); 
			$(selectorArr[n]).css({'font-size': String(Math.round(ratio*fs))+'px'});   
		}
	},


	keySelector: function (operator, key, lowDim, highDim) {
		console.log('keySelector - x - operator: "'+operator+'" , key: "' + key + '", lowDim: ' + lowDim + ', highDim: ' + highDim); 

		// var width = $(window).width();
		var width = parseInt($('.container-fluid').css('width').replace('px', ''));

		var Tkey = null;

		// '<=768px'
		if ((lowDim===null) && (highDim!==null)) {
			console.log('keySelector - A0');

			if (eval(width+operator+highDim)) {
				console.log('keySelector - A1');

				Tkey = key;
			}
		}

		// '768px < 1160px'
		if ((lowDim!==null) && (highDim!==null)) {
			console.log('keySelector - A2');

			if (eval('('+lowDim+operator+width+') && ('+width+operator+highDim+')')) {
				console.log('keySelector - A3');

				Tkey = key;
			}
		}

		// '1160px <='
		if ((lowDim!==null) && (highDim===null)) {
			console.log('keySelector - A4');

			if (eval(lowDim+operator+width)) {
				console.log('keySelector - A5');

				Tkey = key;
			}
		}
		console.log('keySelector - Tkey: ' + Tkey + ', width: ' + width);

		return Tkey;
	}
}


function linearFontScale() {   

	var fontObj = {
		'.slideToggle_header': [
			{'width': '600px', 'font-size': '13px'}, // <----- Width has to be in asending order downwards, e.g.: 500px, 600px, 700px...
			{'width': '1160px', 'font-size': '18px'}
		],
		'.slideToggle_content': [
			{'width': '600px', 'font-size': '10px'}, // <----- Width has to be in asending order downwards, e.g.: 500px, 600px, 700px...
			{'width': '1160px', 'font-size': '15px'}
		]
	}

	var maxWidth = parseInt($('.container-fluid').css('max-width').replace('px', ''));
	var width = parseInt($('.container-fluid').css('width').replace('px', ''));

	var w1, w2, s, s1, s2, a, b;
	for (var selector in fontObj) {
		console.log('linearFontScale - selector: ' + selector + ', fontObj: ' + JSON.stringify( fontObj[selector] ));
		for (var i = 0; i < fontObj[selector].length; i++) {
			w1 = parseInt(fontObj[selector][i]['width'].replace('px', ''));
			s1 = parseInt(fontObj[selector][i]['font-size'].replace('px', ''));
			console.log('linearFontScale - w1: ' + w1 + ', s1: ' + s1);

			if ((i == 0) && (width <= w1)) { 
				$(selector).css({'font-size': s1});
			}
			
			if (i+1 < fontObj[selector].length) {
				w2 = parseInt(fontObj[selector][i+1]['width'].replace('px', ''));
				s2 = parseInt(fontObj[selector][i+1]['font-size'].replace('px', ''));

				if ((w1 < width) && (width < w2)) { 
					a = (s2-s1)/(w2-w1);
					b = s1 - a*w1;

					s = Math.round(a*width + b);

					console.log('linearFontScale - a: ' + a + ', b: ' + b + ', s: ' + s);

					$(selector).css({'font-size': s});
				}
			}

			if ((i+1 == fontObj[selector].length) && (w1 <= width)) {
				$(selector).css({'font-size': s1});
			}
			
		};
	}

	// var ratio = width/maxWidth;
	// var percent = 100*ratio; 

	// var fs;

	// console.log('scaleBaseFonts - maxWidth: ' + maxWidth + ', width: ' + width + ', ratio: ' + ratio + ', percent: ' + percent);

	// for (var n in selectorArr) {
	// 	if (typeof($(selectorArr[n]).attr('data-baseFontSize')) === 'undefined') {
	// 		console.log('scaleBaseFonts - selectorArr['+n+']: ' + selectorArr[n]); 
	// 		$(selectorArr[n]).attr('data-baseFontSize', $(selectorArr[n]).css('font-size').replace('px', ''));
	// 	}
	// 	fs = parseInt($(selectorArr[n]).attr('data-baseFontSize').replace('px', '')); 
	// 	$(selectorArr[n]).css({'font-size': String(Math.round(ratio*fs))+'px'});   
	// }
}


// Scales the fonts in all ".slideToggleMenu"
function slideToggleMenu_scaleFonts() {
	// var selectorArr = ['.slideToggleMenu'];  
	// var selectorArr = ['#slideToggleMenu1', '#slideToggleMenu2', '#slideToggleMenu2b', '#slideToggleMenu3', '.slideToggleMenu_outer', '.slideToggleMenu_inner', '#videoPlayBtn1'];  
	// var selectorArr = ['.slideToggleMenu_outer', '.slideToggleMenu_inner', '#videoPlayBtn1']; 
	var selectorArr = ['.slideToggle_header', '.slideToggle_content', '#videoPlayBtn1'];  

	var maxWidth = parseInt($('.container-fluid').css('max-width').replace('px', ''));
	var width = parseInt($('.container-fluid').css('width').replace('px', ''));

	var ratio = width/maxWidth;
	var percent = 100*ratio; 

	// if (typeof(fs)==='undefined') {
	// 	window.fs = parseInt($('.slideToggleMenu').css('font-size').replace('px', ''));
	// }
	var fs = parseInt(slideToggleMenu_fontSize.replace('px', '')); 

	console.log('slideToggleMenu_scaleFonts - maxWidth: ' + maxWidth + ', width: ' + width + ', ratio: ' + ratio + ', percent: ' + percent + ', fs: ' + fs+ ', ratio*fs: ' + ratio*fs);

	for (var n in selectorArr) {
		// $('#outerContainer > ' + selectorArr[n]).css({'font-size': percent+'%'});
		$('#outerContainer ' + selectorArr[n]).css({'font-size': String(Math.round(ratio*fs))+'px'});   // slideToggleMenu_fontSize
	}
}


function styleSheetProperty() {
	for (var i=0; i < document.styleSheets.length; i++){
	 	var styleSheet = document.styleSheets[i];
	 	console.log('styleSheetProperty - styleSheet: ' + styleSheet);
	 	for (var k = 0; k < styleSheet.length; k++) {
	 		var cssRule = document.styleSheets[i].cssRules[k];
	 		console.log('styleSheetProperty - cssRule: ' + cssRule);
	 	};
	}

	var first_rule = document.styleSheets[1].cssRules[2];
	console.log('styleSheetProperty - first_rule: ' + cssRule);

	
	// https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList
	var allCSS = [].slice.call(document.styleSheets).reduce(function (prev, styleSheet) {
        if (styleSheet.cssRules) {
            return prev +
                [].slice.call(styleSheet.cssRules)
                    .reduce(function (prev, cssRule) {
                        return prev + '(' + cssRule.cssText + ')\n';
                    }, '');
        } else {
            return prev;
        }
    }, '');
	console.log('styleSheetProperty - allCSS: ' + allCSS);


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

$( document ).on('click', ".microhint", function(event){
	$(this).fadeOut( 400, function() {
		$(this).remove();
	});
});

$( document ).on('click', ".objLink", function(event){
	console.log('click - CALLED');

	var dataUrl = $(this).attr('data-url');
	console.log('click - dataUrl: ' + dataUrl);

	window.open(dataUrl, '_blank');

});

$( document ).on('mouseenter', '.objLink', function(){
	console.log('mouseover - CALLED');

	$('.cviOverlay', this).fadeIn( "fast", function() {
		// fadeDone = true;
	});

	$('.btn_ghost', this).switchClass( "btn_ghost_noStyle", "vuc-primary", 300, "easeInOutQuad" );
});

$( document ).on('mouseleave', '.objLink', function(){
	console.log('mouseout - CALLED');
	
	$('.cviOverlay', this).fadeOut( "fast", function() {
		// fadeDone = true;
	});

	$('.btn_ghost', this).switchClass( "vuc-primary", "btn_ghost_noStyle", 300, "easeInOutQuad" );
});
// objLink


$(window).resize(function() {
	scaleAndPosition_sliderContainer();
	slideToggleMenu_align_slideToggle_content();

	// slideToggleMenu_scaleFonts();

	// cc.setBaseFontSize( selectorObj );
	// cc.scaleBaseFonts( ['.slideToggle_header', '.slideToggle_content', '#videoPlayBtn1'] );
	// linearFontScale();
});



// "faq": [
// 		["Hvor lang må min SSO være?", "SSO står for Større Skriftlig Opgave, og er en opgave du skal skrive hvis du tager en fuld HF-eksamen. <br/>Du vælger selv hvilket fag du vil skrive i, og er med til at afgrænse emnet sammen med din vejleder. Der er krav til både indholdet og formen, og du vurderes på din evne til at behandle et fagligt emne på en korrekt og akademisk måde, hvor du bruger fagets stof og metoder."],
// 		["Hvad må man skrive om? (Emne)", "Når du har valgt fag, skal du vælge et emne der hverken er for bredt eller for smalt. Denne emneafgrænsning sker sammen med din vejleder. Det vigtigste er at du kommer til at arbejde med et emne hvor der både er materiale nok og hvor kvaliteten af materialet sikrer at du kan lave en akademisk og faglig opgave, der lever op til de krav der stilles."],
// 		["Hvor lang må SSO’en være?", "Din opgave skal være mellem 10 og 15 sider lang (én normalside = 2400 anslag, inklusiv mellemrum)."],
// 		["Må man inddrage i flere fag?", "Ja, SSO’en skal skrives i ét eller to fag. Du skal dog huske at hvis du vælger at skrive i to fag, så fordobler du de faglige krav til dig selv, idet du vil blive bedømt i begge fag. Det er således langt mere krævende at skrive en SSO i to fag, end i ét."],
// 		["Må man skrive i C-niveau fag?", "Du må ikke skrive i et C-niveau fag alene, der skal indgå et fag på mindst B-niveau. "],
// 		["Hvilke fag kan man vælge mellem?", "Du kan vælge mellem de A- og B-niveau fag som du enten har afsluttet eller er i gang med. Du skal dog overveje om du har opnået faglig viden nok til at skrive en god SSO i et fag som du er i gang med - hvis du har startet faget i januar og skal skrive opgaven i midten af februar (uge 7), har du kun fået ca. én måneds undervisning."]
// 	]



$(document).ready(function() {

	console.log('document.ready - faqObj1: ' + JSON.stringify(faqObj1));
	console.log('document.ready - checklist: ' + JSON.stringify(checklist));
	console.log('document.ready - formalia: ' + JSON.stringify(formalia));


	// $('#outerContainer').append(makeSlideToggleMenus_faq('FAQ: Introduktion til SSO', 'slideToggleMenu1'));
	// $('#outerContainer').append(makeVideoPlayBtn('Test video', 'videoPlayBtn1', 'https://www.youtube.com/embed/-Go7min716I'));
	// $('#outerContainer').append(makeSlideToggleMenus_faq('FAQ 2', 'slideToggleMenu2'));
	// $('#outerContainer').append(makeSlideToggleMenus_faq('FAQ 3', 'slideToggleMenu3'));

	var faqObj;


	faqObj1.header = "FAQ: Om SSO Generelt"; 
	var videoObj1 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer1', {header: "Få overblik over SSO", columnContent: [{'video': videoObj1}, {'faq': faqObj1}, {'checklist': checklist[0]}]} ));   // Om SSO Generelt
	$('#outerContainer').append(makeGroupContainers('groupContainer1', {header: "Få overblik over SSO", columnContent: [{'video': videoObj1}, {'faq': faqObj1}]} ));   // Om SSO Generelt


	faqObj = JSON.parse(JSON.stringify(faqObj1));
	faqObj.header = "FAQ: Valg af fag og emne"; 
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer2', {header: "Vælge fag, emne og vejleder", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer2', {header: "Vælge fag, emne og vejleder", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}]} )); 


	faqObj = JSON.parse(JSON.stringify(faqObj1));
	faqObj.header = "FAQ"; 
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/-Go7min716I'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer3', {header: "Indsnævre emne", columnContent: [ {'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer3', {header: "Indsnævre emne", columnContent: [ {'faq': faqObj}, {'checklist': checklist[1]}]} )); 


	faqObj = JSON.parse(JSON.stringify(faqObj2));
	faqObj.header = "FAQ: Søg efter materialer"; 
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/-Go7min716I'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer4', {header: "Søge materiale", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer4', {header: "Søge materiale", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}]} )); 


	var sso_emner = '';
	sso_emner += '<span id="sso_emner" class="objLink" data-url="../sso_emner/emner.html">';
		sso_emner += '<div class="imgContainer"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="img/sso_emne.png"></div>';
		sso_emner += '<div class="objText"><h3>Få hjælp til at vælge dit emne</h3> <div class="btn_ghost btn_ghost_noStyle btn btn-default">Til emnerne</div> </div>';
	sso_emner += '</span>';
	// $('#outerContainer').append('<a id="sso_emner" href="../sso_emner/emner.html"><img class="img-responsive" src="img/sso_emne.png"></a>');
	$('#outerContainer').append(sso_emner);


	faqObj = JSON.parse(JSON.stringify(faqObj1));
	faqObj.header = "FAQ"; 
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer5', {header: "Læse", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer5', {header: "Læse", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}]} )); 


	faqObj = JSON.parse(JSON.stringify(faqObj3));
	faqObj.header = "FAQ: Om skriveugen"; 
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer6', {header: "Selve skriveugen", columnContent: [{'faq': faqObj}, {'checklist': checklist[2]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer6', {header: "Selve skriveugen", columnContent: [{'faq': faqObj}, {'checklist': checklist[2]}]} )); 


	// $('#outerContainer').append('<a id="sso_skriveuge" href="../sso_skriveuge/skriveuge.html"><img class="img-responsive" src="img/sso_skriveuge.png"></a>');
	var sso_skriveuge = '';
	sso_skriveuge += '<span id="sso_skriveuge" class="objLink" data-url="../sso_skriveuge/skriveuge.html">';
		sso_skriveuge += '<div class="imgContainer"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="img/sso_skriveuge.png"></div>';
		sso_skriveuge += '<div class="objText"><h3>Få overblik over skriveugen</h3> <div class="btn_ghost btn_ghost_noStyle btn btn-default">Til skriveugen</div> </div>';
	sso_skriveuge += '</span>';
	$('#outerContainer').append(sso_skriveuge);


	var sObj = window.getComputedStyle($('.container-fluid')[0], null);   
	console.log('resize - sObj: ' + JSON.stringify(sObj['max-width']));

	console.log('resize - sObj 2 : ' + $('.container-fluid').css('max-width')); 


	//######################################################################################################################################

	// slideToggleMenu_setFontSize();   // <-------------  TEST 7/9-2017
	window.cc = Object.create(cssClass);
	window.selectorObj = {
		'<=768px': {
			'.slideToggle_header': {
				'font-size': '26px'
			}
		},
		'768px < 1160px': {
			'.slideToggle_header': {
				'font-size': '18px'
			}
		}
	};
	// window.selectorArr = ['.slideToggle_header', '.slideToggle_content', '#videoPlayBtn1']; 

	// cc.setBaseFontSize( selectorObj );
	// cc.scaleBaseFonts( ['.slideToggle_header', '.slideToggle_content', '#videoPlayBtn1'] );
	// linearFontScale();  // <---------- // NEWEST function: 11/9-2017


	scaleAndPosition_sliderContainer();

	slideToggleMenu();

	$( "#slider" ).css({left: 0}); // <------ This is a bugfix on the live server, that causes the "#slider" to be initialized outside "#sliderContainer". This moves the "#slider" to the start position.



	microhint($('#slider'), 'Du kan navigere i sidens indhold ved at scrolle eller ved at at trække i slideren.' , true, '#000');
	$('.microhint').css({position: "fixed"});
	microhint($('#sso_emner .btn_ghost'), 'Her er en side, som viser dig lidt om at finde et godt emne. Siden åbner i et nyt vindue' , true, '#000');
});


// $(window).load(function() {
// 	// $( "#slider" ).css({left: 0});
// });