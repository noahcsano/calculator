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
	  this.lastKey = null; //For reading keyboard inputs
	  this.deleteD1 = false;
	}
  }

// Chaanign Signs
function change_sign() {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	if (curr_value == "0" || curr_value == "Start") {
		return;
	}
	if (current.lastKey != undefined) {
		document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
	}
	if (current.sign == "+") {
		current.sign = "-";
		curr_display.textContent = "-" + curr_value;
		if (current.nextVal != undefined) {
			current.nextVal = "-" + current.nextVal;
		}
	}else{
		current.sign = "+";
		curr_display.textContent = curr_value.slice(1);
		if (current.nextVal != undefined) {
			current.nextVal = current.nextVal.toString().slice(1);
		}
	}
	display_curr_calc(curr_display.textContent);
	current.lastKey = "+/-";
	document.getElementsByClassName("+/-")[0].setAttribute("id", "buttonClicked");
};
//AC Case 
function cleare() {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	if (curr_value === 'Start') {
		return;
	}
	if (current.lastKey != undefined) {
		document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
	}
	if (current.deleteD1 = true) {
		logDisplay();
		current.deleteD1 = false;
	} 
	if (current.cleared == true) {  //Next is going to be second clear
		current = class Active {}
		curr_display.textContent = 'Start';
		document.getElementById("last_display1").textContent = "";
		document.getElementById("last_display2").textContent = "";
		document.getElementById("last_display3").textContent = "";
		document.getElementById("last_display4").textContent = "";
		document.getElementById("last_display5").textContent = "";
	} else { //First Clear. Save values
		if (current.nextVal == undefined) {
			current.total = undefined;
		}
		current.cleared = true;
		curr_display.textContent = '0';
		document.getElementById("last_display1").textContent = "";
		current.nextVal = undefined;
	}
	current.display_length = 0;
	current.sign = "+";

	current.lastKey = "Escape";
	document.getElementsByClassName("Escape")[0].setAttribute("id", "buttonClicked");
};
// Adding Values to  Display
function add_to_display(i) {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	i = i.toString();
	if (curr_value.includes(".") && i == ".") {
		return;
	}
	if (current.lastKey != undefined) {
        document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
    }
	if (current.oppActive === true) { //If user clicked an operation before this, we need to store the upcoming value in NextVal so that we can add it later
		if (current.cleared == true) { //Case for 0 or beginning of calculation
			curr_display.textContent = i;
			display_curr_calc(i);
			current.nextVal = i;
			current.cleared = false;
			current.sign = "+";
			current.display_length = 1
		} else if (current.nextVal == undefined) { //If this is the first digit 
			curr_display.textContent = i;
			display_curr_calc(i);
			current.nextVal = i;
			current.sign = "+";
			current.display_length = 1
		} else if (current.display_length > 18) { //Length is too long
			alert('Too Large!');
		}
		else{ //Else
			curr_display.textContent = curr_value + i; 
			display_curr_calc(i);
			current.nextVal += i;
			current.display_length += 1
		}
	} else if (current.display_length > 18) { //Length is too long
		alert('Too Large!');
	} else if (curr_value === 'Start' || curr_value === "0" || current.deleteD1 == true) { //Case for 0 or beginning of calculation
		curr_display.textContent = i;
		logDisplay();
		document.getElementById("last_display1").textContent = i;
		current.cleared = false;
		current.display_length = 1;
		current.sign = "+";
		current.deleteD1 = false;
	} else { //Case where you just continue displaying. At the start of Calc
		var concat = curr_value + i;
		curr_display.textContent = concat;
		display_curr_calc(i);
		current.display_length += 1;
	} 
	current.lastKey = i;
	document.getElementsByClassName(i)[0].setAttribute("id", "buttonClicked");
};
function finishCalc() { //Next Val == the currently displayed final value. We need to add this to our current total, before doing more operations
	if (current.operation == "+") {
		operation(current.nextVal, "+");
	} else if (current.operation == "-") {
		operation(current.nextVal, "-");
	} else if (current.operation == "*") {
		operation(current.nextVal, "*");
	} else if (current.operation == "/") {
		operation(current.nextVal, "/");
	}
	document.getElementById("curr_dis").textContent = current.total;
	display_curr_calc(` = ${current.total}`.toString());
	current.deleteD1 = true;
	current.nextVal = undefined; //reset
};

//Operations
function OP(type) { //Initial Function Called when operation buttons are pressed. Sets 'Active' status ON with what operation
	if (document.getElementById("curr_dis").textContent == "Start") {
		return;
	}
	if (current.lastKey != undefined) {
        document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
    }
	if (current.oppActive === true && current.nextVal != undefined)  { //If there is a pending calculation to be completed, do it and update
		finishCalc(); //Helper Function for above
	}
	current.oppActive = true;
	current.operation = type;
	if (current.total == undefined) { 
		current.total = document.getElementById("curr_dis").textContent;
	}
	display_curr_calc(`${type}`);
	current.lastKey = type;
	document.getElementsByClassName(type)[0].setAttribute("id", "buttonClicked");
};
function operation(val, type) { //Handles Operations based on specified type in Finish Calculations
	if (val == ".") {
		val = "0";
	}
	if (current.total == undefined) { 
		var added = document.getElementById("curr_dis").textContent;
	} else {
		if (type == "+") {
			var added = Number(val)+ Number(current.total); 
		} else if (type == "-") {
			var added = Number(current.total) - Number(val); 
		} else if (type == "*") {
			var added = Number(current.total) * Number(val); 
		} else if (type == "/") {
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

//Equal, Calculate Operations
function calculate() {
	if (document.getElementById("curr_dis").textContent == "Start" || current.nextVal == undefined || current.total == undefined) {
		return;
	}
	if (current.lastKey != undefined) {
        document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
    }
	if (current.oppActive == true)  { //If there is a pending calculation to be completed, do it and update
		finishCalc(); //Helper Function for above
	}
	current.oppActive = false;
	current.operation = undefined;
	current.total = undefined;
	current.lastKey = "Enter";
	document.getElementsByClassName("Enter")[0].setAttribute("id", "buttonClicked");
};

//Percent
function convert_to_percent() {
	if (document.getElementById("curr_dis").textContent == "Start") {
		return;
	}
	if (current.lastKey != undefined) {
        document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
    }
	current.nextVal = 100;
	current.oppActive = true;
	current.operation = "/";
	finishCalc();
	current.oppActive = false;
	current.operation = null;

	current.lastKey = "%";
	document.getElementsByClassName("%")[0].setAttribute("id", "buttonClicked");
}

//Decimal
function decimal() {
	add_to_display(".")
}

//Decimal
function Delete() {
	var curr_display = document.getElementById("curr_dis");
	var curr_value = curr_display.textContent;
	if (curr_value === 'Start' || curr_value == "0") {
		return;
	} 
	// if (current.lastKey != undefined) {
    //     document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
    // }
	if (curr_value == "-") {
		curr_display.textContent = '0';
		display_curr_calc(curr_display.textContent);
		current.cleared = true;
		current.display_length = 1;
	}
	else if (current.nextVal != undefined) {
		curr_display.textContent = curr_display.textContent.slice(0, - 1);
		document.getElementById("last_display1").textContent = document.getElementById("last_display1").textContent.slice(0, - 1);
		current.nextVal = current.nextVal.toString().slice(0, -1);
		current.display_length -= 1;
	} else {
		curr_display.textContent = curr_display.textContent.slice(0, - 1);
		document.getElementById("last_display1").textContent = document.getElementById("last_display1").textContent.slice(0, - 1);
		current.display_length -= 1;
	}
	if (curr_value.length == 1) {
		curr_display.textContent = '0';
		display_curr_calc(curr_display.textContent);
		current.cleared = true;
		current.display_length = 1;
	}
	// current.lastKey = "Backspace";
}
function incomplete() {
	if (current.lastKey != undefined) {
        document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
    }
	return;
}


function display_curr_calc(val) {
	document.getElementById("last_display1").textContent += val;
}

function logDisplay() {
	document.getElementById("last_display5").textContent = document.getElementById("last_display4").textContent;
	document.getElementById("last_display4").textContent = document.getElementById("last_display3").textContent;
	document.getElementById("last_display3").textContent = document.getElementById("last_display2").textContent;
	document.getElementById("last_display2").textContent = document.getElementById("last_display1").textContent;
}
var current = class Active {};