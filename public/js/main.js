/* globals requirejs:false, window:false */

requirejs.config({
  paths: {
    'jquery':       '../components/jquery/dist/jquery',
    'underscore':   '../components/underscore/underscore',
    'backbone':     '../components/backbone/backbone',
    'localstorage': '../components/backbone.localStorage/backbone.localStorage',
    'text':         '../components/requirejs-text/text',
    'async':        '../components/requirejs-plugins/src/async',
    'bootstrap':    '../components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'jquery': { exports: '$' },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'backbone'
    },
    'underscore': { exports: '_' },
    'bootstrap': { 
      deps: [ 'jquery' ] 
    }
  }
});

require([
  'underscore',
  'jquery',
  'backbone',
  'localstorage',
  'bootstrap',
  'models/Product',
  'collections/Products',
  'views/Products',
  'views/Basket',
  'db/DB'
], 
function(_, $, Backbone, LocalStorage, 
  Bootstrap, ProductModel, Products, 
  ProductsView, BasketView, DB

) {
  'use strict';

  var LARGE_SCREEN = 768;
  var productsLocalStorage = new LocalStorage('Products');
  var products = new Products(undefined, productsLocalStorage);

  var productsView = new ProductsView({
    products: products,
    el:       $('#mys_js__targetProducts')
  });
  productsView.render();

  var isLargeView = productsView.$el.width()>768;
  var basketView = new BasketView({
    products: products,
    isLargeView: isLargeView,
    el:       $('#mys_js__basket')
  });
  basketView.render();  

  var resizeBasket = function() {
    var windowWidth = $(window).width();
    if(windowWidth>LARGE_SCREEN) {
      var pos = productsView.$el.position();
      var width = productsView.$el.width();
      basketView.setViewSize(true);
      $('#mys_js__basket').css('left', pos.left+width+10);
    }else {
      $('#mys_js__basket').css('left', '');
      basketView.setViewSize(false);
    }
  };
  $(window).resize(resizeBasket);
  _.defer(resizeBasket, 1);

  //initiate face database if not exist
  var storedProducts = productsLocalStorage.findAll();
  if(_.isEmpty(storedProducts)) {
    var dbProducts = DB.getProducts();
    _.each(dbProducts, function(dbProduct) {
      var product = new ProductModel();
      product.fromDbORM(dbProduct);
      products.create(product.toJSON());
    });    
  }else {
    products.fetch();
  }
  
});
