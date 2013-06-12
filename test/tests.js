define([
  "dom-perignon"
], function(DOM) {
  /*
   * doing loader testing with real XHR objects
   */
  function new_xhr() {
      var xhr;
      if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
          try {
              xhr = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
          }
      }
      return xhr;
  }

  function loader(cb) {
    var xhr = new_xhr();

    xhr.open("GET", "/base/test/tests.html");
    if(DOM.document) {
      xhr.responseType = "document";
    }
    xhr.onreadystatechange = function() {
      if(xhr.readyState < 4) {
        return;
      }

      if(xhr.status == 200) {
        cb(xhr);
      } else {
        throw new Error("Loading failed " + xhr.status);
      }
    };

    xhr.send();
  }

  function standardTests(doc, done) {
    var els = doc.querySelectorAll("[data-qa=test-elements]");
    assert(els[0].nodeName, "IMG");
    assert(els[1].nodeName, "P");
    assert(els[1].firstChild.nodeType, 3);

    done();
  }

  it("should determine whether the XHR DOM parser can be used for HTML", function(done) {
    setTimeout(function() {
      assert(typeof DOM.document != "undefined", true);
      dump("Document parsing in this browser: ", DOM.document);
      done();
    }, 100);
  });

  it("should parse a string", function(done) {
    var testStr = '<img src="my_img.jpg" alt="hi there" data-qa="test-elements"> <p data-qa="test-elements"> QA text content in here!  </p>';
    var doc = DOM(testStr);
    standardTests(doc, done);
  });

  it("should parse an XHR object", function(done) {
    loader(function(xhr) {
      var doc = DOM(xhr);
      standardTests(doc, done);
    });
  });
});
