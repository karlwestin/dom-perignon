/*
 * DOM Perignon
 * A small DOM parser that takes either an XHR Object or a string
 *
 * also, feature-detects whether the browser can parse html documents via XHR.
 * (c) 2013 Karl Westin
 *
 * MIT License:
 * http://opensource.org/licenses/MIT
 */
define(function() {
  var supportsParsing = (function() {
    try {
      return !!(new DOMParser().parseFromString("", "text/html"));
    } catch(e) {
      return false;
    }
  })();

  function Parser(xhr) {
    try {
      if(xhr.responseXML && xhr.responseXML.documentElement.childNodes) { // Modern Browser ajax response
        return xhr.responseXML;
      } else if(xhr.nodeType === 1) { // DOM element
        return xhr;
      }
    } catch(err) {}

    // string or older browser ajax response
    var text = typeof xhr == "string" ? xhr : xhr.responseText;

    if(supportsParsing) {
      var parser = new DOMParser();
      return parser.parseFromString(text, "text/html");
    }

    var doc;
    try{
      doc = document.implementation.createHTMLDocument("temporary title");
      doc.documentElement.innerHTML = text;
    } catch(e) {
      // IE8 or 9 
      // 8 doesn't support createHTMLDocument
      // 9 doesn't support setting innerHTML of the <html> node
      doc = document.createElement("div");
      doc.innerHTML = text;
    }

    return doc;
  }

  Parser.document = (function() {
    if(!window.XMLHttpRequest) {
      return false;
    }

    function check(xhr) {
      try {
        var el = xhr.responseXML.body;
        if(el && (el.firstChild.nodeType === 3 || el.firstChild.nodeType === 1)) {
          Parser.document = true;
        } else {
          Parser.document = false;
        }
      } catch(e) {
        Parser.document = false;
      }
    }

    var xhr = new window.XMLHttpRequest();
    xhr.open("GET", window.location.href, true);
    xhr.responseType = "document";
    xhr.onreadystatechange = function() {
      if(this.readyState === 4) {
        check(xhr);
      }
    };
    xhr.send();
  })();

  return Parser;
});
