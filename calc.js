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
	  this.total = undefined;
	  this.display_length = 0;
	  this.sign = "+";
	  this.oppActive = false;
	  this.operation = null;
	  this.nextVal = undefined;
	  this.finishCalc = false;
	}
  }

// Chaanign Signs
function change_sign() {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	if (curr_value == "0" || curr_value == "Start") {
		return;
	}
	else if (current.sign == "+") {
		current.sign = "-";
		curr_display.textContent = "-" + curr_value;
		if (current.nextVal != undefined) {
			current.nextVal = "-" + curr_value;
		}
		
	}else{
		current.sign = "+";
		curr_display.textContent = curr_value.slice(1);
		if (current.nextVal != undefined) {
			current.nextVal = curr_value.slice(1);
		}
		
	}
};
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
	if (current.oppActive === true) { //If user clicked an operation before this, we need to store the upcoming value in NextVal so that we can add it later
		i = i.toString();
		if (current.nextVal == undefined) { //If this is the first digit 
			curr_display.textContent = i;
			current.cleared = false;
			current.nextVal = i;
			current.sign = "+";
		} else{ //Else
			curr_display.textContent = curr_value + i; 
			current.nextVal += i;
		}
		return;
	} else if (current.display_length >  18) { //Length is too long
		alert('Too Large!');
	} else if (curr_value === 'Start' || curr_value === "0") { //Case for 0 or beginning of calculation
		curr_display.textContent = i;
		current.cleared = false;
		current.display_length = 1;
		current.sign = "+";
	} else { //Case where you just continue displaying. At the start of Calc
		var concat = curr_value + i;
		curr_display.textContent = concat;
		current.display_length += 1;
	} 
	current.oppActive = false;
};
function finishCalc() { //Next Val == the currently displayed final value. We need to add this to our current total, before doing more operations

	if (current.operation == "add") {
		operation(current.nextVal, "add");
	} else if (current.operation == "sub") {
		operation(current.nextVal, "sub");
	} else if (current.operation == "mul") {
		operation(current.nextVal, "mul");
	} else if (current.operation == "div") {
		operation(current.nextVal, "div");
	}
	document.getElementById("curr_dis").textContent = current.total;
	current.finishCalc = false; //reset
	current.nextVal = undefined; //reset
}

//Operations
function OP(type) { //Initial Function Called when operation buttons are pressed. Sets 'Active' status ON with what operation
	if (document.getElementById("curr_dis").textContent == "Start") {
		return;
	}
	if (current.oppActive === true && current.nextVal != undefined)  { //If there is a pending calculation to be completed, do it and update
		finishCalc(); //Helper Function for above
	}
	current.oppActive = true;
	current.operation = `${type}`;
	if (current.total == undefined) { 
		current.total = document.getElementById("curr_dis").textContent;
	}
};
function operation(val, type) { //Handles Operations based on specified type in Finish Calculations
	if (current.total === undefined) {
		var added = Number(val); 
	} else {
		if (type == "add") {
			var added = Number(val)+ Number(current.total); 
		} else if (type == "sub") {
			var added = Number(current.total) - Number(val); 
		} else if (type == "mul") {
			var added = Number(current.total) * Number(val); 
		} else if (type == "div") {
			var added = Number(current.total) / Number(val); 
		} 
	}
	addedStr = added.toString();
	current.total = addedStr;
	if (added < 0) {
		current.sign = "-";
	} else{
		current.sign = "+";
	}
};  





var current = class Active {};