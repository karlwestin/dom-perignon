Dom Perignon
===

* Takes an XHR object and converts the response to a DOM structure
* Takes a string and converts to a DOM structure
* Determines whether the browser is capable of parsing html using responseType = "document"

### Usage

```
define(["dom-perignon"], function(Parse) {
  return function Load(url, callback) {
    var xhr = new_xhr(); // your fav cross-browser method
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
    if(this.readyState === 4) {
        // use Dom Perignon to parse this
        var doc = Parse(xhr);
        callback(doc);
    }
    };

    // check if the XHR object supports html parsing
    if(Parse.document) {
      xhr.responseType = "document";
    }

    xhr.send();
  }
});
```

###Compatibility

Known to work in (as in tested in):
* IE8+ 
* Safari 5+  
* Chrome 27
* Firefox 21
* Opera 11.62

it probably works in earlier versions as well, please file issues if not
