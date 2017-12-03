'use strict';

(function(){
$(function(){




	// FANCYBOX
	if( $("[data-fancybox='gallery']").length != 0 )
		$("[data-fancybox='gallery']").fancybox({
			afterShow : function( instance, current ) {
			},
			animationEffect : "fade",
			transitionEffect: "zoom-in-out"
		});


	//WOW
	new WOW({
		offset: 30
	}).init();

		// AOS
	AOS.init({
	  offset: 0,
	  duration: 2000,
	  once: true,
	  delay: 100
	});
	setTimeout(function(){AOS.refresh()}, 100)

	// SKROLLR
	if( !isMobile ){
		var skr = skrollr.init({
			smoothScrolling: true,
			mobileDeceleration: 0.004
		});
		setTimeout( function(){ skr.refresh() }, 10 )
	}

  // Flikity Carousel

	var carouselPartners = $('.carousel-partners .carousel-content').flickity({
		arrowShape: { 
		  x0: 10,
		  x1: 65, y1: 50,
		  x2: 65, y2: 0,
		  x3: 55
		},
		prevNextButtons: false,
		adaptiveHeight: true,
		initialIndex: 2,
		//draggable: !checkView(991),
		pageDots: false,
		contain: true,
		cellAlign: 'center'
	});



	//FORM
	(function() {

		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {

			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'input--filled' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'input--filled' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'input--filled' );
			}
		}
	})();











	//RESIZE
	$( window ).on("resize", function(e){});

	//SCROLL
	var header_status = false;
	$( window ).on("scroll", function(e){

		if($(window).scrollTop() > 300 && header_status == false){
			header_status = true; 
		}else if($(window).scrollTop() < 300 && header_status == true){
			header_status = false;
		}
		lsTextReplaceCheck( $("[data-ls-text]") );

	});

	if ( $("[data-ls-text]").length )
	$("[data-ls-text]").map( function(i, el){
		$(el).attr( "data-ls-text", $(el).text() ).text("");
	} )
	function lsTextReplaceCheck (el) {
		for ( var i = 0; i < el.length ; i++)
			if( scrolledDiv( el[i] ) && !el[i].hasAttribute("text-replaced") )
				lsTextReplace( el[i], $(el[i]).attr("data-ls-text") )
		
	}
	function lsTextReplace(el, textValue) {
		TweenMax.to( el, 3, {
			text: {
				padSpace: true,
				ease:Power2.easeIn,
				value: textValue
			}
		} );
		$(el).attr("text-replaced", "true");
	}










	var images = 						 		document.images,
			imagesTotalCount = 			images.length,
			imagesLoadedCount = 		0,
			preloadPercent = 		 $(".percent");
	for ( var i = 0; i < imagesTotalCount ; i++ ) {
		var image_clone = new Image();
				image_clone.onload = 		image_loaded;
				image_clone.onerror = 	image_loaded;
				image_clone.src = 			images[i].src;

	}
	function image_loaded (){
		imagesLoadedCount++;

		var per = ( ( 100 / imagesTotalCount ) * imagesLoadedCount ) << 0 ;
		var ser = ( ( 400 * Math.PI / imagesTotalCount ) * imagesLoadedCount ) << 0 ;

		setTimeout( function(){
			$(preloadPercent).text(  per +  "%"); 
		}, 220)

		$(".logo-circle-1").eq(0).css("stroke-dasharray", ser).css("stroke-width", 3);

		if ( imagesLoadedCount >= imagesTotalCount )

			setTimeout( function (){
				//$(".preloader").slideToggle();
				$( "body" ).css("overflow-y", "auto");
			}, 600)

	}

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  e.target // newly activated tab
	  e.relatedTarget // previous active tab
	  console.log( e.target, e.relatedTarget )
	})




	});
}) (jQuery);














var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);










// COMMON FUNCTION

function checkView( width ){
	return ($( document ).width() > width);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function scrolledDiv(el) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}