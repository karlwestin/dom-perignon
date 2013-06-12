
// todo: polyfill for Object.keys
var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /tests\.js/.test(file);
});

require.config({
  baseUrl: "/base",

  deps: tests,

  callback: function() {
    window.expect = chai.expect;
    mocha.setup({
      globals: ["expect"]
    });
    window.__karma__.start();
  }
});
