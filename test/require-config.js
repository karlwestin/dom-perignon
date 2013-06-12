
// todo: polyfill for Object.keys
var tests = [];
var files = window.__karma__.files;
for(var file in files) {
  if(files.hasOwnProperty(file)) {
    if(/tests\.js/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
  baseUrl: "/base",

  deps: tests,

  callback: function() {
    mocha.setup({
      globals: ["assert"]
    });
    window.__karma__.start();
  }
});
