'use strict';
window.onload = function () {
    // Todo make loading gerenric
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("san-calc-body").innerHTML = this.responseText;
            var repeatElements = getElementsByAttribute('data-repeat');
            makeDuplicates(repeatElements);
        }
    };
    xhttp.open("GET", "views/calculator.html", true);
    xhttp.send();

    document.addEventListener('click', function (e) {
        if (hasClass(e.target, 'san-calc-key')) {
            var keyValue = e.target.innerText;
            if (keyValue === "=") {
                //to do
                var displayText = getDisplayText(),
                    lastChar = getLastChar(displayText),
                    answer = "";
                if (operators.indexOf(lastChar) > -1) {
                    displayText = removeEndOperator(displayText);
                }
                answer = displayText.replace('x', '*');
                answer = answer.replace(/\b0+/g, '');
                try {
                    answer = eval(answer);
                    displayText += " = " + answer;
                    setDisplayText(displayText);
                } catch (e) {
                }

            } else if (keyValue === "C") {
                setDisplayText('');
            }

            else {
                updateDisplay(keyValue);
            }
        }
    }, false);
}
var operators = ["x", "/", "-", "+", "%"];
function getDisplayText() {
    var displayNode = document.getElementsByClassName("san-calc-display")[0],
        displayText = '';

    displayText = displayNode.innerText;
    return displayText;
}
function setDisplayText(text) {
    document.getElementsByClassName("san-calc-display")[0].innerText = text;
}
function updateDisplay(value) {
    var displayText = getDisplayText();
    if (displayText.length > 0) {
        if (displayText.indexOf("=") > -1) {
            var result = displayText.split("=");
            if (result[result.length - 1]) {
                result = result[result.length - 1].trim();
                displayText = result;
            }
        }
        var lastChar = getLastChar(displayText);
        if (operators.indexOf(lastChar) > -1 && operators.indexOf(value) > -1) {
            displayText = removeEndOperator(displayText);
        }
        if (operators.indexOf(lastChar) > -1 || operators.indexOf(value) > -1) {
            displayText += " ";
        }
    }
    displayText += value;
    setDisplayText(displayText);
}

function getLastChar(string) {
    return string.substr(string.length - 1)
}

function removeEndOperator(expresssion) {
    expresssion = expresssion.slice(0, - 1);
    expresssion = expresssion.trim();
    return expresssion;
}

function hasClass(element, className) {
    return element.className.split(' ').indexOf(className) > -1;
}

function makeDuplicates(repeatElements) {
    var i = 0,
        node = null;
    while (node = repeatElements[i++]) {
        var childValues = node.getAttribute("data-repeat"),
            siblingContainer = document.createDocumentFragment();
        childValues = childValues.replace(/'/g, '"');
        childValues = JSON.parse(childValues);
        node.removeAttribute("data-repeat");

        for (var j = 0; j < childValues.length; j++) {
            if (j === 0) {
                node.innerHTML = childValues[j];
            } else {
                var dup = node.cloneNode(true);
                dup.innerText = childValues[j];
                siblingContainer.appendChild(dup);
            }

        }
        node.parentNode.insertBefore(siblingContainer, node.nextSibling);

    }
}

function getElementsByAttribute(attribute, context) {
    var nodeList = (context || document).getElementsByTagName('*');
    var nodeArray = [];
    var iterator = 0;
    var node = null;

    while (node = nodeList[iterator++]) {
        if (node.hasAttribute(attribute)) nodeArray.push(node);
    }

    return nodeArray;
}
