/*  
Tongue jQuery Plugin

Version: 1.0

Author: Muhammad Usman

Author URI: http://usman.it

Copyright (c) 2012, Muhammad Usman

*/

(function( $ ){
	//Strict mode
	'use strict';
	
	$.fn.tongue = function(options) {
		//Default options
		var settings = $.extend({
			'position'		:	'bottom',
			'tongue_content':	'.tongue-content',
			'start_speed'	:	500,
			'end_speed'		:	400
		}, options);
		
		//Get the selector
		var tongue_selector = this.selector;
		var $tongue = $(this);
		
		//Mouse enter event, this event is `live`, so any dynamically element will work
		$(document).on('mouseenter', tongue_selector, function(e){
			//Get the tongue content element
			var $tongue_content = $(this).find(settings.tongue_content);
			//Place the element at proper place, before or after
			$tongue_content.remove();
			if(settings.position == 'bottom')	
			{
				$tongue_content.appendTo($(this));
			}else
			{
				$tongue_content.prependTo($(this));
			}
			
			//Show tongue content as its property is set hidden
			$tongue_content.show();
			
			//Slide down the tongue content by setting normal margin
			$tongue_content.stop().animate({marginTop : -2}, settings.start_speed);
		});
		
		//Mouse leave event, this event is also `live`
		$(document).on('mouseleave', tongue_selector, function(e){
			//Get the tongue content element
			var $tongue_content = $(this).find(settings.tongue_content);
			//Get negative value of the offset height of the element, 
			// to be set as marginTop to hide tongue content behind.
			var margin_top = -1 * $tongue_content.prop('offsetHeight');
			
			//Slide tongue content up and hide it after that
			$tongue_content.stop().animate({marginTop : margin_top}, settings.end_speed, function(){
				$tongue_content.hide();
			});
		});
		
		//Return to allow chaining
		return this.each(function() {
			var $tongue_content = $(this).find(settings.tongue_content);
			var margin_top = -1 * $tongue_content.prop('offsetHeight');
			
			//Sett CSS properties if position is bottom
			if(settings.position == 'bottom')
			{
				$(this).css({
					'position' : 'relative',
					'z-index' : '1',
					'overflow' : 'visible'
				});

				$tongue_content.css({
					'position' : 'absolute',
					'z-index' : '-1',
					'margin-top' : margin_top,
					'display' : 'none'
				});
			//Sett CSS properties if position is not bottom, top
			}else
			{
				$(this).css({
					'position' : 'relative',
					'z-index' : '1',
					'overflow' : 'hidden'
				});

				$tongue_content.css({
					'position' : 'absolute',
					'z-index' : '2',
					'margin-top' : margin_top,
					'display' : 'none'
				});
			}
			
		});
	};
})( jQuery );
