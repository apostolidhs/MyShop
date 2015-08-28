/* globals requirejs:false */

requirejs.config({
  paths: {
    jquery:     '../components/jquery/dist/jquery',
    underscore: '../components/underscore/underscore',
    backbone:   '../components/backbone/backbone',
    text:       '../components/requirejs-text/text',
    async:      '../components/requirejs-plugins/src/async'
  },
  shim: {
    jquery: { exports: '$' },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'backbone'
    },
    underscore: { exports: '_' }
  }
});

require([
  'underscore',
  'backbone'
], 
function() {
  
});
