/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
    var app = new EmberApp(defaults, {
    });

    // import bootstrap JS...
    app.import('bower_components/bootstrap/dist/js/bootstrap.js');

    // import paintr...
    app.import('vendor/paintr/paintr.js');
    app.import('vendor/paintr/paintr.css');


    return app.toTree();
};
