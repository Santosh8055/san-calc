(function (window, library) {
    if (typeof sanLib === "undefined") {
        window.sanLib = new library();
    }
})(typeof window !== "undefined" ? window : this, function () {
    document.addEventListener('click', function (e) {
        var node = e.target;
        if (node) {
            // check registered class
            var classList = e.target.classList;
            for (var selector of classList) {
                if (_clickRegisterClasses && _clickRegisterClasses[selector]) {
                    for (var callback of _clickRegisterClasses[selector]) {
                        if (typeof callback === "function") {
                            callback(e);
                        }
                    }
                }
            }

        }
    }, false);
    var SL = function () { },
        _clickRegisterClasses = {};
    SL.prototype.onClick = function (type, selector, callback) {
        if (type && type === "class") {
            if (!_clickRegisterClasses[selector]) {
                _clickRegisterClasses[selector] = [];
            }
            _clickRegisterClasses[selector].push(callback);
        }
    };
    //TO make it recursive 
    SL.prototype.makeDuplicates = function (repeatElements) {
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
    };


    SL.prototype.getElementsByAttribute = function (attribute, context) {
        var nodeList = (context || document).getElementsByTagName('*');
        var nodeArray = [];
        var iterator = 0;
        var node = null;

        while (node = nodeList[iterator++]) {
            if (node.hasAttribute(attribute)) nodeArray.push(node);
        }

        return nodeArray;
    };

    SL.prototype.setNodeDisplayText = function (node, text) {
        if (node === "undefined" || typeof node !== "string") {
            return;
        }
        switch (node.charAt(0)) {
            case ".":
                if (node.slice(1) && node.slice(1).length > 0) {
                    var domElements = document.getElementsByClassName(node.slice(1));
                    for (domElement of domElements) {
                        domElement.innerHTML = text;
                    }
                }
                break;
            case "#":
                if (node.slice(1) && node.slice(1).length > 0) {
                    var domElement = document.getElementsById(node.slice(1));
                    if (domElement) {
                        domElement.innerText = text;
                    }
                }
                break;

        }

    }
    return new SL;
});