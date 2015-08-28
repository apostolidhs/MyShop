require.config({
  paths: {
    'jquery':       '../public/components/jquery/dist/jquery',
    'underscore':   '../public/components/underscore/underscore',
    'backbone':     '../public/components/backbone/backbone',
    'text':         '../public/components/requirejs-text/text',
    'async':        '../public/components/requirejs-plugins/src/async',
    'mocha':        '../public/components/mocha/mocha',
    'chai':         '../public/components/chai/chai',
    'chai-jquery':  '../public/components/chai-jquery/chai-jquery'
  },
  shim: {
    'chai-jquery': ['jquery', 'chai'],
    'mocha': {
        init: function () {
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
    }
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});


define([
  'chai',
  'chai-jquery',
  'mocha'
],
function(chai, chaiJquery, mocha) {
  var should = chai.should();
  chai.use(chaiJquery);

  require([
    'units/ShopItem',
  ], function(ShopItem) {
    mocha.run();
  });

});