
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
	HTML += 	'<h4 class="slideToggle_header"><span class="glyphicon glyphicon-question-sign"></span><div class="slideToggle_headerText">'+header+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
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
	HTML += 	'<h4 class="slideToggle_header"><span class="glyphicon glyphicon-ok-sign"></span><div class="slideToggle_headerText">'+checklistObj.header+'</div><span class="slideGlyph glyphicon glyphicon-chevron-down"></span></h4>';
	HTML += 	'<div class="slideToggle_content">';
		for (var n in checklistObj.checklist) {
			// HTML += '<div class="checklistItem"><span class="glyphicon glyphicon-ok"></span>'+checklistObj.checklist[n]+'</div>';
			HTML += '<div class="checklistItem"><span class="glyphicon glyphicon-ok"></span><div class="checklistItemText">'+checklistObj.checklist[n]+'</div></div>';
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

	UserMsgBox_video( videoSrc );
});


$( document ).on('click', '.videoPlayThumbnail', function(){
	console.log('videoPlayThumbnail - CLICK - CALLED');
	var videoSrc = $(this).attr('data-videoSrc');

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

				// $(element).css({'border-top-left-radius': '4px'});  // TLY does not want this any more...
			} else {
				// $(element).css({'border-top-left-radius': '0px'});  // TLY does not want this any more...
			}
		}
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

	$('.cviOverlay', this).fadeIn( "fast", function() {});

	$('.btn_ghost', this).switchClass( "btn_ghost_noStyle", "vuc-primary", 300, "easeInOutQuad" );
});

$( document ).on('mouseleave', '.objLink', function(){
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
		'groupContainer1': -300, 
		'groupContainer2': -200, 
		'groupContainer3': 0, 
		'groupContainer4': 0, 
		'groupContainer5': 0, 
		'groupContainer6': 0
	}
	// var pos = Math.round($("#"+scrollTo).offset().top + 0);
	var pos = Math.round($("#"+scrollTo).offset().top + ajust[scrollTo]);
	// $('#outerContainer').append('<div style="background-color:#F00; width: 20px; height: 20px; position: absolute; top:'+pos+'px;"></div>');
	$('html, body').animate({  // See: https://stackoverflow.com/questions/6677035/jquery-scroll-to-element
        scrollTop: pos
    }, 1000);
});


$(window).resize(function() {
	scaleAndPosition_sliderContainer();
	slideToggleMenu_align_slideToggle_content();

	
});


$(document).ready(function() {

	console.log('document.ready - faqObj1: ' + JSON.stringify(faqObj1));
	console.log('document.ready - checklist: ' + JSON.stringify(checklist));
	console.log('document.ready - formalia: ' + JSON.stringify(formalia));


	var faqObj;


	faqObj1.header = "FAQ: Om SSO Generelt"; 
	var videoObj1 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer1', {header: "Få overblik over SSO", columnContent: [{'video': videoObj1}, {'faq': faqObj1}, {'checklist': checklist[0]}]} ));   // Om SSO Generelt
	$('#outerContainer').append(makeGroupContainers('groupContainer1', {header: "Få overblik over SSO", columnContent: [{'video': videoObj1}, {'faq': faqObj1}]} ));   // Om SSO Generelt


	faqObj = JSON.parse(JSON.stringify(faqObj2));
	faqObj.header = "FAQ: Valg af fag og emne"; 
	checklist[9].header = "Tjekliste: Fag og emne";
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer2', {header: "Vælge fag, emne og vejleder", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer2', {header: "Vælge fag, emne og vejleder", columnContent: [{'faq': faqObj}, {'checklist': checklist[9]}]} )); 


	faqObj = JSON.parse(JSON.stringify(faqObj2));
	faqObj.header = "FAQ: Emner"; 
	checklist[9].header = "Tjekliste: Emne";
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/-Go7min716I'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer3', {header: "Indsnævre emne", columnContent: [ {'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer3', {header: "Indsnævre emne", columnContent: [ {'faq': faqObj}, {'checklist': checklist[9]}]} )); 


	faqObj = JSON.parse(JSON.stringify(faqObj2));
	faqObj.header = "FAQ: Søg efter materialer"; 
	checklist[9].header = "Tjekliste: Materialer";
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/-Go7min716I'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer4', {header: "Søge materiale", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer4', {header: "Søge materiale", columnContent: [{'faq': faqObj}, {'checklist': checklist[9]}]} )); 


	var sso_emner = '';
	sso_emner += '<span id="sso_emner" class="objLink col-xs-12 col-sm-6" data-url="../sso_emner/emner.html">';
		sso_emner += '<div class="imgContainer"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="img/sso_emne.png"></div>';
		sso_emner += '<div class="objText"><h3>Få hjælp til at vælge dit emne</h3> <div class="btn_ghost btn_ghost_noStyle btn btn-default">Til emnerne</div> </div>';
	sso_emner += '</span>';
	// $('#outerContainer').append('<a id="sso_emner" href="../sso_emner/emner.html"><img class="img-responsive" src="img/sso_emne.png"></a>');
	$('#outerContainer').append(sso_emner);


	faqObj = JSON.parse(JSON.stringify(faqObj1));
	faqObj.header = "FAQ"; 
	checklist[9].header = "Tjekliste: Læs";
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer5', {header: "Læse", columnContent: [{'faq': faqObj}, {'checklist': checklist[1]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer5', {header: "Læse", columnContent: [{'faq': faqObj}, {'checklist': checklist[9]}]} )); 


	faqObj = JSON.parse(JSON.stringify(faqObj3));
	faqObj.header = "FAQ: Om skriveugen"; 
	var videoObj2 = {thumbnailSrc: 'img/dummy_introyoutube.png', videoSrc: 'https://www.youtube.com/embed/WmYhbS401lY'};
	// $('#outerContainer').append(makeGroupContainers('groupContainer6', {header: "Selve skriveugen", columnContent: [{'faq': faqObj}, {'checklist': checklist[2]}, {'formalia': formalia[1]}]} )); 
	$('#outerContainer').append(makeGroupContainers('groupContainer6', {header: "Selve skriveugen", columnContent: [{'faq': faqObj}, {'checklist': checklist[0]}]} )); 


	// $('#outerContainer').append('<a id="sso_skriveuge" href="../sso_skriveuge/skriveuge.html"><img class="img-responsive" src="img/sso_skriveuge.png"></a>');
	var sso_skriveuge = '';
	sso_skriveuge += '<span id="sso_skriveuge" class="objLink col-xs-12 col-sm-6" data-url="../sso_skriveuge/skriveuge.html">';
		sso_skriveuge += '<div class="imgContainer"><div class="cviOverlay">&nbsp;</div><img class="img-responsive" src="img/sso_skriveuge.png"></div>';
		sso_skriveuge += '<div class="objText"><h3>Få overblik over skriveugen</h3> <div class="btn_ghost btn_ghost_noStyle btn btn-default">Til skriveugen</div> </div>';
	sso_skriveuge += '</span>';
	$('#outerContainer').append(sso_skriveuge);


	var sObj = window.getComputedStyle($('.container-fluid')[0], null);   
	console.log('resize - sObj: ' + JSON.stringify(sObj['max-width']));

	console.log('resize - sObj 2 : ' + $('.container-fluid').css('max-width')); 


	//######################################################################################################################################

	
	scaleAndPosition_sliderContainer();


	slideToggleMenu();


	$( "#slider" ).css({left: 0}); // <------ This is a bugfix on the live server, that causes the "#slider" to be initialized outside "#sliderContainer". This moves the "#slider" to the start position.


	microhint($('#slider'), 'Du kan navigere i sidens indhold ved at scrolle eller ved at at trække i slideren.' , true, '#000');
	$('.microhint').css({position: "fixed"});
	microhint($('#sso_emner .btn_ghost'), 'Her er en side, som viser dig lidt om at finde et godt emne. Siden åbner i et nyt vindue' , true, '#000');
});

