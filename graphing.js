//Get container for graph
var container = document.getElementById('desmos');
var calculator = Desmos.GraphingCalculator(container, {keypad: false, expressions: false, settingsMenu: false, invertedColors: true});
// Event listener for graph button
var enter = document.getElementById('enter');
var equation = document.getElementById('equation');

enter.addEventListener('click', () => {
    const eq = equation.value;
    graphEquation(eq);
});


function graphEquation(equation) {
    // Clear existing expressions
    calculator.setBlank();

    // Add expression to calculator
    calculator.setExpression({ id: 'graph1', latex: equation });

    // Update the graph
    calculator.updateSettings({ left: -10, right: 10, top: 10, bottom: -10 });
}


document.addEventListener("keydown", function(event) {
    if (event.key == "esc" || event.key == "q" || event.key == "r"){ 
        window.location.href = "index.html";
    }
});
