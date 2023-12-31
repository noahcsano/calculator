var currently_graph = false;
document.addEventListener("keydown", function(event) {
    if (currently_graph == true && event.key != "r" ){ //All buttons but r is blocked in graph mode
        return;
    }
    if (current.lastKey != undefined) {
        document.getElementsByClassName(current.lastKey)[0].removeAttribute("id", "buttonClicked");
    }
    if (event.key == "1"){ //Numbers
        add_to_display(1);
    } else if (event.key == "2") {
        add_to_display(2);
    } else if (event.key == "3") {
        add_to_display(3);
    } else if (event.key == "4") {
        add_to_display(4);
    } else if (event.key == "5") {
        add_to_display(5);
    } else if (event.key == "6") {
        add_to_display(6);
    } else if (event.key == '7') {
        add_to_display(7);
    } else if (event.key == "8") {
        add_to_display(8);
    } else if (event.key == '9') {
        add_to_display(9);
    } else if (event.key == "0") {
        add_to_display(0);
    } else if (event.key == "+") { // Operators
        OP('+');
    } else if (event.key == "-") {
        OP('-');
    } else if (event.key == "*") { 
        OP('*');
    } else if (event.key == "/") { 
        OP('/');
    } else if (event.key == "^") { 
        OP("^");
    }  else if (event.key == ".") {
        decimal();
    } else if (event.key == "=") { 
        calculate();
    } else if (event.key == "Enter") { 
        calculate();
    } else if (event.key == "Backspace") { 
        Delete();
        return;
    } else if (event.key == "Escape") { 
        cleare();
    } else if (event.key == "s") { 
        sqrt();
    } else if (event.key == "q") { 
        off();
    } else if (event.key == "g") { 
        G();
        return;
    } else if (event.key == "r" && currently_graph == true) { 
        return_to_calc();
        return;
    } else {
        return; 
    }
    
    current.lastKey = event.key;
    document.getElementsByClassName(`${event.key}`)[0].setAttribute("id", "buttonClicked");
});


//Get container for graph
var container = document.getElementById('desmos');
var calculator = Desmos.GraphingCalculator(container, {expressionsCollapsed: true, keypad: false, settingsMenu: false, invertedColors: true});



