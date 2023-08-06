$(function () {
	'use strict';
	
	var width = $(window).width();
	var height = $(window).height();
	$('.section.started').css({'height':height});
	
	/* Preloader */
	$(window).on('load', function() {
		$(".preloader .spinner").fadeOut(function(){
			$('.preloader').fadeOut();
			$('body').addClass('ready');
		});
	});
    return;
});

class Active {
	constructor() {
	  this.cleared = false; //If True, it means that the next clear is going to reset the calculator
	  this.total = 0;
	  this.display_length = 0;
	  this.sign = "+";
	}
  }
var current = class Active {}
//AC Case 
function cleare() {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	if (curr_value === 'Start') {
		return;
	} else if (current.cleared == true) {
		current = class Active {}
		curr_display.textContent = 'Start';
	} else {
		current.cleared = true;
		curr_display.textContent = '0';
	}
	current.display_length = 0;
	current.sign = "+";
};
// Adding Values to  Display
function add_to_display(i) {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	if (curr_value === 'Start' || curr_value === "0") {
		curr_display.textContent = i;
		current.cleared = false;
		current.display_length = 1;
		current.sign = "+";
	} else if (current.display_length >  18) {
		alert('Too Large!');
	}
	else {
		var concat = curr_value + i;
		curr_display.textContent = concat;
		current.display_length += 1;
	}
};
// Adding Values to  Display
function change_sign() {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	if (current.sign == "+") {
		current.sign = "-";
		curr_display.textContent = "-" + curr_value;
	}else{
		current.sign = "+";
		curr_display.textContent = curr_display.textContent.slice(1);
	}
};


