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
  function Parser(xhr) {
    try {
      if(xhr.responseXML && xhr.responseXML.documentElement.childNodes) { // Modern Browser ajax response
        return xhr.responseXML;
      } else if(xhr.nodeType === 1) { // DOM element
        return xhr;
      }
    } catch(err) {
      console.log(err);
    }

    // string or older browser ajax response
    var doc;
    var frame; 
    var docEl;

    try{
      doc = document.implementation.createHTMLDocument("temporary title");
      doc.documentElement.innerHTML = typeof xhr == "string" ? xhr : xhr.responseText;
    } catch(e) {
      // IE8 or 9 
      // 8 doesn't support createHTMLDocument
      // 9 doesn't support setting innerHTML of the <html> node
      doc = document.createElement("div");
      doc.innerHTML = typeof xhr == "string" ? xhr : xhr.responseText;
    }

    return doc;
  }

  Parser.document = false;

  return Parser;
});
