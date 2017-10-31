
//=========================================
// 		Links to resources:
//=========================================
//
// Draggable containment:
// https://jqueryui.com/draggable/#constrain-movement
// 
// God metode til at centrer tekst vertikalt og horisontalt - se svar fra "Michiel van Oosterhout" 
// https://stackoverflow.com/questions/8865458/how-do-i-vertically-center-text-with-css



window.scrollHeight = $('body').height(); // This n 
window.sliderContainerWidth = $('#sliderContainer').width();
window.sliderContainerheight = $('#sliderContainer').height();


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



function UserMsgBox_video(src) {

    var HTML = '<div class="video embed-responsive embed-responsive-16by9 col-xs-12 col-md-12"><iframe class="embed-responsive-item" src="'+src+'?iv_load_policy=3&amp;modestbranding=1&amp;showinfo=0&amp;autohide=1&amp;rel=0" allowfullscreen="1" frameborder="0"></iframe></div>';
    UserMsgBox_xclick('body', HTML);

    $('.MsgBox_bgr').addClass('MsgBox_bgr_video');
    $('#UserMsgBox').attr('id', 'UserMsgBox_video');
    // $('.CloseClass').addClass('glyphicon-remove-circle').removeClass('glyphicon-remove');

    // $('.CloseClass').html('<span class="CloseClass_inner right glyphicon glyphicon-remove"></span>');  // TEST to see if it is possible to place a inner glyphicon-remove inside another...

    // $('MsgBox_bgr_video').hide().fadeIn();
}


$( ".MsgBox_bgr_video" ).on( "keydown", function( event ) {
	if ((event.which == 165) && ($( ".MsgBox_bgr_video" ).length > 0)) {
		$( ".MsgBox_bgr_video" ).fadeOut(400, function(){
			$(this).remove();
		});
	}
});

// $( document ).on('click', '.videoPlayBtn', function(){
$( document ).on('click', '.videoPlayBtn', function(){
	console.log('videoPlayBtn - CLICK - CALLED');
	var videoSrc = $(this).attr('data-videoSrc');

	if ((typeof(videoSrc)!=='undefined') && (videoSrc.length > 0)) {
		UserMsgBox_video( videoSrc );

		scaleVideo('16:9');
	}
});


$( document ).on('click', '.videoPlayThumbnail', function(){
	console.log('videoPlayThumbnail - CLICK - CALLED');
	var videoSrc = $(this).closest('.objLink').attr('data-videoSrc');
	console.log('videoPlayBtn - CLICK - videoSrc: ' + videoSrc + ', this.tagName: ' + $(this).find('.objLink').prop("tagName"));

	if ((typeof(videoSrc)!=='undefined') && (videoSrc.length !== '')) {
		UserMsgBox_video( videoSrc );

		scaleVideo('16:9');
	}
});


function scaleVideo(ratio) {
	console.log('\nscaleVideo - CALLED');

	if ($( ".MsgBox_bgr_video" ).length > 0) {
		var w = $( ".MsgBox_bgr_video" ).width();
		var h = $( ".MsgBox_bgr_video" ).height();
		// var ratio = 16/9;
		var ratioArr = ratio.split(':');
		ratio = parseInt(ratioArr[0])/parseInt(ratioArr[1]);
		console.log('scaleVideo 1 - w: ' + w + ', h: ' + h + ', ratio: ' + ratio + ' ratio*h: ' + String(ratio*h));

		if (w >= ratio*h) {
			w = ratio*h;
		} else {
			h = w/ratio;
		}
		console.log('scaleVideo 2 - w: ' + w + ', h: ' + h + ', ratio: ' + ratio + ' ratio*h: ' + String(ratio*h));

		$('#UserMsgBox_video').width(w);
		$('#UserMsgBox_video').height(h);
	}
}


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


	$( document ).on('click', '.slideToggleMenu_img', function(){  // QUICK FIX! TLY wants an img for both FAQs and tjeklists - slideToggle needs to activate when the img is clicked.
		var parentObj = $(this).closest('.card');
		$( "> .slideToggle_header", parentObj ).trigger( "click" );
	});


	$( document ).on('click', '.slideToggle_header', function(){  
		console.log('.slideToggle_header - click - CALLED');
		var jqThis = this;
		var parentObj = $(this).parent();
		$('> .slideToggle_content', parentObj).slideToggle(400, function() {
			// if ($('> .slideGlyph', jqThis).hasClass('glyphicon-chevron-down')) {   // COMMENTED OUT 12/10-2017 - TLY wants chevron up/down action to be immeadiate!
			// 	$('> .slideGlyph', jqThis).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
			// } else {
			// 	$('> .slideGlyph', jqThis).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			// }
		});

		if ($('> .slideGlyph', jqThis).hasClass('glyphicon-chevron-down')) {  // ADDED 12/10-2017 - TLY wants chevron up/down action to be immeadiate!
			$('> .slideGlyph', jqThis).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
		} else {
			$('> .slideGlyph', jqThis).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
		}
		
		$('.objElement').each(function( index, element ) {
			$(element).css({'z-index': 0});
		});

		$(parentObj).closest('.objElement').css({'z-index': 1});
	});

	// When the user interacts with an ".objElement" all ".slideToggle_content" for each ".slideToggleMenu_outer" needs to close.
	$( document ).on('click', '.card', function( event ){ 
		console.log('\n.card - click - CALLED - id: ' + $(this).attr('id'));

		var Tthis = this;
		$('.card').each(function( index, element ) {
			console.log('.card - click - each.index: ' + index + ', id: ' + $(element).attr('id'));

			if (($('> .slideToggle_content', element).is(':visible')) && ($(Tthis).attr('id') != $(element).attr('id'))) {
				console.log('.card - click - A0');

				$('> .slideToggle_content', element).hide();

				if ($('> .slideToggle_header .slideGlyph', element).hasClass('glyphicon-chevron-down')) {  // ADDED 12/10-2017 - TLY wants chevron up/down action to be immeadiate!
					$('> .slideToggle_header .slideGlyph', element).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
				} else {
					$('> .slideToggle_header .slideGlyph', element).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
				}
			} else {
				console.log('.card - click - A1');
			}
		});
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

				// $(element).css({'border-top-left-radius': '4px'});  // TLY does not want this any more...
			} else {
				// $(element).css({'border-top-left-radius': '0px'});  // TLY does not want this any more...
			}
		}
	});
}


//===============================================
//				KOPI FRA SKRIVEUGEN
//===============================================
$( document ).on('click', '.skriveuge_item', function(){   // <----- KOPI FRA SKRIVEUGEN
	if ($('.btn', this).length) {
		console.log('click - A0');
		var numOfSlides = jsonData.itemsPrSlide_global;
		var index_day = $(this).closest('.carouselPage').index();
		var index_slide = $(this).closest('.item').index();
		var index_card = $(this).closest('.skriveuge_item').index();
		var json_index = numOfSlides*index_slide + index_card; 
		console.log('click - index_day: ' + index_day + ', index_slide: ' + index_slide + ', index_card: ' + index_card + ', json_index: ' + json_index);

		var cardObj = jsonData.day[index_day].content[json_index];
		console.log('click - cardObj: ' + JSON.stringify(cardObj));

		if (cardObj.hasOwnProperty('userMsgBox_data')) {
			console.log('click - A1');
			var displayMode = cardObj.userMsgBox_data.displayMode;
			var HTML = '';

			switch (displayMode) {
	            case "html":
	            	console.log('click - A2');
	                HTML += '<div id="UserMsgBox_text">'+cardObj.userMsgBox_data.html+'</div>';
	                break;
	            case "text":
	            	console.log('click - A3');
	                HTML += '<div id="UserMsgBox_text">'+cardObj.userMsgBox_data.text+'</div>';
	                break;
	            default:
	            	console.log('click - A4');
	                alert('Invalid "type"');
			}

			UserMsgBox('body', HTML);

			html(cardObj.userMsgBox_data);
		}
	}
});



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

	if ((typeof(dataUrl)!=='undefined') && (dataUrl.length > 0)) {
		console.log('click - dataUrl: ' + dataUrl);

		window.open(dataUrl, '_blank');
	}

});

// $( document ).on('mouseenter', '.objLink', function(){   // COMMENTED OUT 12/10-2017
$( document ).on('mouseenter', '.card', function(){ 		// ADDED 12/10-2017
	console.log('mouseover - CALLED');

	$('.cviOverlay', this).fadeIn( "fast", function() {});

	$('.btn_ghost', this).switchClass( "btn_ghost_noStyle", "vuc-primary", 300, "easeInOutQuad" );
});

// $( document ).on('mouseleave', '.objLink', function(){   // COMMENTED OUT 12/10-2017
$( document ).on('mouseleave', '.card', function(){			// ADDED 12/10-2017
	console.log('mouseout - CALLED');
	
	$('.cviOverlay', this).fadeOut( "fast", function() {});

	$('.btn_ghost', this).switchClass( "vuc-primary", "btn_ghost_noStyle", 300, "easeInOutQuad" );
});
// objLink

$( document ).on('click', ".imgOverlayBtn", function(event){
	console.log('click - CALLED - SCROLL');
	var scrollTo = $(this).attr('data-scrollTo');
	console.log('click - SCROLL - scrollTo: ' + scrollTo + ', offset().top: ' + $("#"+scrollTo).offset().top + ', height()/2: ' + $("#"+scrollTo).height()/2);
	// var pos = Math.round($("#"+scrollTo).offset().top - $("#"+scrollTo).height()/2);
	// var pos = Math.round($("#"+scrollTo).offset().top + $("#"+scrollTo).outerWidth( true )/2);
	var ajust = {
		'groupHeading1': -300, 
		'groupHeading2': -200, 
		'groupHeading3': -200, 
		'groupHeading4': -200, 
		'groupHeading5': -200
	}
	// var pos = Math.round($("#"+scrollTo).offset().top + 0);

	// var pos = Math.round($("#"+scrollTo).offset().top + ajust[scrollTo]);    // COMMENTED OUT 12/10-2017
	var pos = Math.round($("#"+scrollTo).offset().top - sliderContainerheight);	// ADDED 12/10-2017

	// $('#outerContainer').append('<div style="background-color:#F00; width: 20px; height: 20px; position: absolute; top:'+pos+'px;"></div>');
	$('html, body').animate({  // See: https://stackoverflow.com/questions/6677035/jquery-scroll-to-element
        scrollTop: pos
    }, 1000);
});


$( document ).on('click', ".userMsgBox_link", function(event){

	event.preventDefault();

	var link = $(this).attr('data-link');

	if (link != '') {
		UserMsgBox('body', $('#'+link).html());
		$('.MsgBox_bgr').css({'z-index': '102'});
	}
});


//#################################################################################################################
//											NY KODE 12/10-2017
//#################################################################################################################


function makeGroupContainer(id, groupHeading, groupArr) {
	var HTML = '';
	HTML += '<div id="'+id+'" class="groupContainer">';
		HTML += '<div class="groupHeading col-xs-12"><h2>'+groupHeading+'</h2></div>';
		for (var n in groupArr) {
			// HTML += '<div class="groupElement'+((!detectmob())?' column_50_percent':' column_100_percent')+(((n%2==0) && (!detectmob()))?' floatLeft':' floatRight')+'">'+groupArr[n]+'</div>';
			HTML += '<div class="groupElement col-xs-12 col-sm-6">'+groupArr[n]+'</div>';
		}
	HTML += '</div>';

	return HTML;
}


function groupHeading(id, heading) {
	return '<div id="'+id+'" class="objElement groupHeading col-xs-12"><h2>'+heading+'</h2></div>';
}


function makeVideoCard(id, cardText, btnText, imgSrc, videoSrc) {
	var HTML = '';
	HTML += '<div id="'+id+'" class="objElement card objLink videoPlayThumbnail" data-videosrc="'+videoSrc+'">';
		HTML += '<div class="imgContainer"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+imgSrc+'"></div>';
		HTML += '<div class="objText"><h3>'+cardText+'</h3> <div class="btn_ghost btn_ghost_noStyle btn btn-primary">'+btnText+'</div> <div class="Clear"></div></div>';
	HTML += '</div>';
	
	return HTML;
}

function makeObjectCard(id, cardText, btnText, imgSrc, url) {
	var HTML = '';
	HTML += '<div id="'+id+'" class="objElement card objLink" data-url="'+url+'">';
		HTML += '<div class="imgContainer"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+imgSrc+'"></div>';
		HTML += '<div class="objText"><h3>'+cardText+'</h3> <div class="btn_ghost btn_ghost_noStyle btn btn-primary">'+btnText+'</div> </div>';
	HTML += '</div>';

	return HTML;
}

function makeSlideToggleCard_faq(id, cardText, imgSrc, faqObj) {
	console.log('makeSlideToggleMenus_faq - jsonData: ' + JSON.stringify(jsonData));

	var HTML = '';
	HTML += '<div id="'+id+'" class="objElement card slideToggleMenu_outer slideToggleMenu slideToggleMenus_faq">';
	// HTML += 	'<img class="img-responsive slideToggleMenu_img" src="'+imgSrc+'">';
	HTML += 	'<div class="imgContainer slideToggleMenu_img"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+imgSrc+'"></div>';
	HTML += 	'<h3 class="slideToggle_header"><div class="slideToggle_headerText">'+cardText+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h3>';
	HTML += 	'<div class="slideToggle_content">';
		for (var n in faqObj.faq) {
			HTML += '<div class="slideToggleMenu_inner slideToggleMenu">';
			HTML += 	'<h4 class="slideToggle_header"><div class="slideToggle_headerText">'+faqObj.faq[n][0]+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
			HTML += 	'<div class="slideToggle_content">'+faqObj.faq[n][1]+'</div>';
			HTML += '</div>';
		}
	HTML += 	'</div>';
	HTML += '</div>';
	console.log('makeSlideToggleMenus_faq - HTML: ' + HTML); 

	return HTML;
}


function makeSlideToggleCard_example(id, cardText, imgSrc, exObj) { 
	console.log('makeSlideToggleMenus_faq - jsonData: ' + JSON.stringify(jsonData));

	var HTML = '';
	HTML += '<div id="'+id+'" class="objElement card slideToggleMenu_outer slideToggleMenu slideToggleMenus_faq">';
	// HTML += 	'<img class="img-responsive slideToggleMenu_img" src="'+imgSrc+'">';
	HTML += 	'<div class="imgContainer slideToggleMenu_img"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+imgSrc+'"></div>';
	HTML += 	'<h3 class="slideToggle_header"><div class="slideToggle_headerText">'+cardText+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h3>';
	HTML += 	'<div class="slideToggle_content">';
		for (var name in exObj.subject) {
			HTML += '<div class="slideToggleMenu_inner slideToggleMenu">';
			HTML += 	'<h4 class="slideToggle_header"><div class="slideToggle_headerText">'+name+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
			HTML += 	'<div class="slideToggle_content">';
			for (var n in exObj.subject[name]) {
				HTML += '<div class="slideToggleMenu_inner slideToggleMenu">';
				HTML += 	'<h4 class="slideToggle_header"><div class="slideToggle_headerText">'+exObj.subject[name][n].title+', karakter: '+exObj.subject[name][n].grade+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
				HTML += 	'<div class="slideToggle_content">';
				// HTML += 		exObj.subject[name][n].title + '<br>' + exObj.subject[name][n].subHeader + '<br> Karakter: ' +exObj.subject[name][n].grade + '<br> <i>' +exObj.subject[name][n].description +'</i>';
				HTML += 		'<h5><b>'+exObj.subject[name][n].title + '</b></h5><i>' +exObj.subject[name][n].description +'</i><br><a href="'+exObj.subject[name][n].url+'" target="_blank">Download</a>';
				HTML += 	'</div>';
				HTML += '</div>';
			}
			HTML += 	'</div>';
			HTML += '</div>';
		}
	HTML += 	'</div>';
	HTML += '</div>';
	console.log('makeSlideToggleMenus_faq - HTML: ' + HTML);

	return HTML;
}


function makeSlideToggleCard_checklist(id, cardText, imgSrc, checklistObj) {
	console.log('makeSlideToggleMenus_checklist - checklistObj: ' + JSON.stringify(checklistObj));

	var HTML = '';
	HTML += '<div id="'+id+'" class="objElement card slideToggleMenu_outer slideToggleMenu slideToggleMenus_checklist">';
	// HTML += 	'<img class="img-responsive slideToggleMenu_img" src="'+imgSrc+'">';
	HTML += 	'<div class="imgContainer slideToggleMenu_img"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="'+imgSrc+'"></div>';
	HTML += 	'<h3 class="slideToggle_header"><div class="slideToggle_headerText">'+cardText+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h3>';
	HTML += 	'<div class="slideToggle_content">';
		for (var n in checklistObj.checklist) {
			HTML += '<div class="checklistItem"><span class="glyphicon glyphicon-ok"></span><div class="checklistItemText">'+checklistObj.checklist[n]+'</div></div>';
		}
	HTML += 	'</div>';
	HTML += '</div>';
	console.log('makeSlideToggleMenus_checklist - HTML: ' + HTML);

	return HTML;
}


function insertCards() {

	var faqObj;

	$('#outerContainer').append(groupHeading('groupHeading1', 'Få overblik over SSO'));
	$('#outerContainer').append(makeVideoCard('sso_video1', 'Introduktion til at skrive SSO', 'Se filmen', 'img/video1.png', 'https://www.youtube.com/embed/tLFbQK38bsg'));
	// $('#outerContainer').append(makeSlideToggleCard_faq('faq1', "Spørgsmål til SSO", "img/faq_img.png", faqObj1));
	$('#outerContainer').append(makeSlideToggleCard_faq('faq1', faqObj1.userInterface.header, "img/faq_img.png", faqObj1));


	faqObj = JSON.parse(JSON.stringify(faqObj2));
	$('#outerContainer').append(groupHeading('groupHeading2', 'Vælge fag, emne og vejleder'));
	// $('#outerContainer').append(makeSlideToggleCard_faq('faq2', "Spørgsmål til valg af fag og emne", "img/faq_img.png", faqObj));
	$('#outerContainer').append(makeSlideToggleCard_faq('faq2', faqObj.userInterface.header, "img/faq_img.png", faqObj));
	$('#outerContainer').append(makeSlideToggleCard_checklist('checklist1', 'Tjekliste: Fag, emne og vejleder', 'img/tjekliste_img.png', checklist[0]));
	$('#outerContainer').append(makeObjectCard('sso_emner', 'Få hjælp til at vælge dit emne', 'Se emneoversigten', 'img/sso_emne.png', '../sso_emner/emner.html'));
	$('#outerContainer').append(makeObjectCard('sso_skriveguide', 'Få hjælp til formulering af emne', 'Prøv skriveguiden', 'img/skriveguide_img.png', '../sso_emner/emner.html'));
	$('#outerContainer').append(makeVideoCard('sso_video2', 'Vejlederens rolle', 'Se filmen', 'img/video1.png', 'https://www.youtube.com/embed/tLFbQK38bsg'));


	faqObj = JSON.parse(JSON.stringify(faqObj2));
	$('#outerContainer').append(groupHeading('groupHeading3', 'Søge efter materialer'));
	// $('#outerContainer').append(makeSlideToggleCard_faq('faq3', "Spørgsmål om at finde materialer", "img/faq_img.png", faqObj));
	$('#outerContainer').append(makeSlideToggleCard_faq('faq3',  "Spørgsmål om at finde materialer", "img/faq_img.png", faqObj));
	$('#outerContainer').append(makeSlideToggleCard_checklist('checklist2', 'Tjekliste: Materialer', 'img/tjekliste_img.png', checklist[1]));


	example = JSON.parse(JSON.stringify(example));
	$('#outerContainer').append(groupHeading('groupHeading4', 'Læse'));
	// $('#outerContainer').append(makeSlideToggleCard_faq('faq4', "Spørgsmål om læseprocessen", "img/faq_img.png", faqObj));
	$('#outerContainer').append(makeSlideToggleCard_example('faq4', "Eksempler på opgaver", "img/eksemplariske_img.png", example));
	$('#outerContainer').append(makeSlideToggleCard_checklist('checklist3', 'Tjekliste: Læs', 'img/tjekliste_img.png', checklist[2]));


	faqObj = JSON.parse(JSON.stringify(faqObj3));
	$('#outerContainer').append(groupHeading('groupHeading5', 'Selve skriveugen'));
	// $('#outerContainer').append(makeSlideToggleCard_faq('faq5', "Spørgsmål til skriveugen", "img/faq_img.png", faqObj));
	$('#outerContainer').append(makeSlideToggleCard_faq('faq5', faqObj.userInterface.header, "img/faq_img.png", faqObj));
	$('#outerContainer').append(makeObjectCard('sso_skriveuge', 'Få overblik over skriveugen', 'Hjælp til skriveugen', 'img/sso_skriveuge.png', '../sso_skriveuge/skriveuge.html'));
	$('#outerContainer').append(makeVideoCard('sso_video3', 'Har du styr på det hele inden skriveugen?', 'Se filmen', 'img/video1.png', 'https://www.youtube.com/embed/tLFbQK38bsg'));
	$('#outerContainer').append(makeSlideToggleCard_checklist('checklist4', 'Tjekliste: Klar til skriveugen?', 'img/tjekliste_img.png', checklist[3]));
}


function mobileDisplay() {
	if (detectmob()) {
		$('#mainImg').hide();
		$('.card').addClass('card_mobile').removeClass('card');  // IMPORTANT: This disables the auto-closing of FAQs and tjecklists!
		$('.objElement').css({'position': 'relative', 'top': '0px', 'left': '0px', 'display': 'table', 'width': 'inherit', 'max-width': '800px'});  // <---- Indsæt disse i klassen card_mobile?
		// $('.card').css({'margin-bottom': '3%'});

		mobileDisplay_setLeftMargin();
	}
}


function mobileDisplay_setLeftMargin() {

	if (detectmob()) {
		var averageWidth, sumWidth  = 0;
		var count = 0;
		$('.objElement').each(function( index, element ) {
			sumWidth += $(element).outerWidth();
			++count;
			averageWidth = sumWidth/count;
		});

		var w = $('#outerContainer').innerWidth();
		var marginLeft = (w - averageWidth)/2;
		console.log('mobileDisplay - w: ' + w + ', marginLeft: ' + marginLeft);

		$('.objElement').css({'margin-left': marginLeft});
	}
}

//#################################################################################################################
//											RUN PROGRAM
//#################################################################################################################


$(window).resize(function() {
	scaleAndPosition_sliderContainer();
	// slideToggleMenu_align_slideToggle_content();

	mobileDisplay_setLeftMargin();

	scaleVideo('16:9');
});


$(document).ready(function() {

	console.log('document.ready - faqObj1: ' + JSON.stringify(faqObj1));
	console.log('document.ready - checklist: ' + JSON.stringify(checklist));
	console.log('document.ready - formalia: ' + JSON.stringify(formalia));

	insertCards();

	mobileDisplay();

	console.log('resize - sObj 2 : ' + $('.container-fluid').css('max-width')); 


	//###################################################################################################################################### 

	
	scaleAndPosition_sliderContainer();


	slideToggleMenu();


	$( "#slider" ).css({left: 0}); // <------ This is a bugfix on the live server, that causes the "#slider" to be initialized outside "#sliderContainer". This moves the "#slider" to the start position.


	microhint($('#slider'), 'Du kan klikke i menuen herover for at scrolle ned på siden.' , true, '#000');
	$('.microhint').css({position: "fixed"});
	microhint($('#sso_emner .btn_ghost'), 'Her er en side, som viser dig lidt om at finde et godt emne. Siden åbner i et nyt vindue' , true, '#000');
});

