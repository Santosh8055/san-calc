'use strict';
var _operators = ["*", "/", "-", "+", "%", "=", "C"],
    _currentNumber = "",
    _currentDisplay = "",
    _currentOperation = "",
    _finalAnswer = 0;
function variablesInitialize() {
    _currentNumber = "";
    _currentDisplay = "";
    _currentOperation = "";
    _finalAnswer = 0;
}
window.onload = function () {
    // Todo make loading gerenric
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("san-calc-app").innerHTML = this.responseText;
            var repeatElements = sanLib.getElementsByAttribute('data-repeat');
            sanLib.makeDuplicates(repeatElements);
        }
    };
    xhttp.open("GET", "views/calculator.html", true);
    xhttp.send();
}
sanLib.onClick('class', 'san-calc-key', function (e) {
    var keyValue = e.target.innerText;

    if (_operators.indexOf(keyValue) === -1) {
        if (_currentOperation === "=") {
            _currentDisplay = _finalAnswer + "";
            _finalAnswer = 0;
            sanLib.setNodeDisplayText(".san-calc-answer", "");
            _currentNumber = _currentDisplay + keyValue;
            _currentOperation = "";
        } else {
            _currentNumber += keyValue;
        }
        updateCurrentHistory(keyValue);
    } else if (keyValue === "=") {
        if (_currentOperation !== "=") {
            calculateAndUpdate(keyValue);
            _currentNumber = _finalNumber;
        }
    } else if (keyValue === "C") {
        variablesInitialize();
        sanLib.setNodeDisplayText(".san-calc-answer", "");
        sanLib.setNodeDisplayText(".san-calc-history", _currentDisplay);
    } else {
        calculateAndUpdate(keyValue);
        updateCurrentHistory(" " + keyValue + " ");
        _currentNumber = "";

    }

});
function calculateAndUpdate(keyValue) {
    if (!_currentNumber) {
        return false;
    }
    var number = Number(_currentNumber);
    if (_currentOperation !== "" && _currentOperation !== "=") {
        try {
            _finalAnswer = eval(_finalAnswer + _currentOperation + number);
        } catch (e) {
            console.warn("something went wrong " + e);
        }
    } else {
        _finalAnswer = number;
    }
    _currentOperation = keyValue;
    sanLib.setNodeDisplayText(".san-calc-answer", _finalAnswer);
}
function updateCurrentHistory(number) {

    _currentDisplay += number;
    sanLib.setNodeDisplayText(".san-calc-history", _currentDisplay);
}
