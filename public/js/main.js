/* globals requirejs:false */

requirejs.config({
  paths: {
    jquery:       '../components/jquery/dist/jquery',
    underscore:   '../components/underscore/underscore',
    backbone:     '../components/backbone/backbone',
    localstorage: '../components/backbone.localStorage/backbone.localStorage',
    text:         '../components/requirejs-text/text',
    async:        '../components/requirejs-plugins/src/async',
    bootstrap:    '../components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    jquery: { exports: '$' },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'backbone'
    },
    underscore: { exports: '_' },
    bootstrap: { 
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

  var productsLocalStorage = new LocalStorage('Products');
  var products = new Products(productsLocalStorage);

  //initiate face database if not exist
  var storedProducts = productsLocalStorage.findAll();
  if(_.isEmpty(storedProducts)) {
    var dbProducts = DB.getProducts();

    _.each(dbProducts, function(dbProduct) {
      var product = new ProductModel();
      product.fromDbORM(dbProduct);
      products.create(product);
    });  
  }

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

  $(window).resize(function() {
    var pos = productsView.$el.position();
    var width = productsView.$el.width();
    var windowWidth = $(window).width();
    if(windowWidth>768) {
      basketView.setViewSize(true);
      $('#mys_js__basket').css('left',pos.left+width+10);
    }else {
      $('#mys_js__basket').css('left','');
      basketView.setViewSize(false);
    }
  });

  // _.delay(function(){
  //   var pos = productsView.$el.position();
  //   var width = productsView.$el.width();
  //   $('#mys_js__basket').css('left',pos.left+width+10);
  // }, 1);

  products.fetch();
});
