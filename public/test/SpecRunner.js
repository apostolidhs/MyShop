require.config({
  baseUrl: '../js/',
  paths: {
    'jquery':       '../components/jquery/dist/jquery',
    'underscore':   '../components/underscore/underscore',
    'backbone':     '../components/backbone/backbone',
    'text':         '../components/requirejs-text/text',
    'async':        '../components/requirejs-plugins/src/async',
    'bootstrap':    '../components/bootstrap/dist/js/bootstrap.min',
    'mocha':        '../components/mocha/mocha',
    'chai':         '../components/chai/chai',
    'chai-jquery':  '../components/chai-jquery/chai-jquery'
  },
  shim: {
    'chai-jquery': ['jquery', 'chai'],
    'mocha': {
        init: function () {
          'use strict';

          this.mocha.setup('bdd');
          return this.mocha;
        }
    },
    'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    'underscore': {
        exports: '_'
    },
    'bootstrap': { 
      deps: [ 'jquery' ] 
    }
  }
  // ,
  // urlArgs: 'bust=' + (new Date()).getTime()
});


define([
  'chai',
  'chai-jquery',
  'mocha'
],
function(chai, chaiJquery, mocha) {
  'use strict';

  var should = chai.should();
  chai.use(chaiJquery);

  require([
    '../test/units/ProductModel',
    '../test/units/ProductsCollection',
    '../test/units/ProductView',
    '../test/units/ProductsView',
    '../test/units/BasketView'
  ], function() {
    mocha.run();
  });

});