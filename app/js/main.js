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


	// SKROLLR
	if( !isMobile ){

		var skr = skrollr.init({
			smoothScrolling: true,
			mobileDeceleration: 0.004
		});
		setTimeout( function(){ skr.refresh() }, 10 )
	}

	//Owl.Carousel
	if( $(".index-carousel").length != 0 )
	$(".index-carousel").owlCarousel({
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    //autoWidth: true,
	    //rewind: true,
	    mergeFit: true,
	    center: true,
	    loop: true,
	    items:1,
	    //margin:30,
	    //mouseDrag: false,
	    autoplay: true,
	    autoplayTimeout: 6000,
	    smartSpeed:450
	});

  // Flikity Carousel
  	var arrowStyle = { 
		  x0: 10,
		  x1: 60, y1: 50,
		  x2: 70, y2: 40,
		  x3: 30
		}
  // PARTNERS
	var carouselPartners = $('.carousel-partners .carousel-content').flickity({
		autoPlay: 2000,
		arrowShape: arrowStyle,
		//imagesLoaded: true,
		//prevNextButtons: false,
		wrapAround: true,
		adaptiveHeight: true,
		//selectedAttraction: 0.2,
		//friction: 0.2,
		//rightToLeft: true,
		pageDots: false,
		//contain: true,
		//percentPosition: true,
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
	});





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
				$(".preloader").slideToggle();
				$( "body" ).css("overflow-y", "auto");
				scroll(0, 0);
			}, 600)

	}








		$("body").on("mousemove", function(e){
		$("#dust-content").css("left", (10 + (-e.pageX/100)))
					 .css("bottom", (300 + (e.pageY/100)));
		});




//canvasDust

  window.canvasDust = {

  	circle: {
  		elements : [],
  		firstElPos: [],
  		pos: []
  	},

  	stepCheck: function (posx, posy, radius){
  		var arr = {
									x: posx,
									y: posy,
									radius: radius
								};

			canvasDust.circle.pos.push(arr);

			return arr;
  	},

  	circleAnimate : function ( canvasObj, x, y, i ){

			var tl = new TimelineMax({
				repeat: -1,
				yoyo: true
			});

			tl
				.to(canvasObj, getRandomIntFloat(2, 5), {
		      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
		      														 getRandomInt( y, y+100 ),
		      														 getRandomInt( 0, 3 ), )})
				.to(canvasObj, getRandomIntFloat(2, 5), {
		      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
		      														 getRandomInt( y, y+100 ),
		      														 getRandomInt( 0, 3 ), )})
				.to(canvasObj, getRandomIntFloat(2, 5), {
		      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
		      														 getRandomInt( y, y+100 ),
		      														 getRandomInt( 0, 3 ), )})
				.to(canvasObj, getRandomIntFloat(2, 5), {
		      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
		      														 getRandomInt( y, y+100 ),
		      														 getRandomInt( 0, 3 ), )})
				.to(canvasObj, getRandomIntFloat(2, 5), {
		      konva: canvasDust.stepCheck( getRandomInt( x, x+200 ), 
		      														 getRandomInt( y, y+100 ),
		      														 getRandomInt( 0, 3 ), )})

		}
  }

	var width = window.innerWidth;
	var height = 450;

	var stage = new Konva.Stage({

		container: 'dust-content',
		width: width,
		height: height

	});

	var layer = new Konva.Layer();


	for ( var i = 0 ; i < 80 ; i++ ){

		var firstElPosX = getRandomInt( 0, width );
		var firstElPosY = getRandomInt( 0, height );

		canvasDust.circle.firstElPos[i] = {
			x: firstElPosX,
			y: firstElPosY
		}

		canvasDust.circle.elements[i] = new Konva.Circle({
			x: firstElPosX,
			y: firstElPosY,
			opacity: 0.3,
			radius: 1,
			fill: 'white',
			strokeWidth: 4
		});

		layer.add( canvasDust.circle.elements[i] );

		canvasDust.circleAnimate( canvasDust.circle.elements[i], firstElPosX, firstElPosY, i );
		
	}

	stage.add(layer);



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