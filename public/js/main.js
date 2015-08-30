/* globals requirejs:false */

requirejs.config({
  paths: {
    jquery:     '../components/jquery/dist/jquery',
    underscore: '../components/underscore/underscore',
    backbone:   '../components/backbone/backbone',
    localstorage: '../components/backbone.localStorage/backbone.localStorage',
    text:       '../components/requirejs-text/text',
    async:      '../components/requirejs-plugins/src/async',
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

  var basketView = new BasketView({
    products: products,
    el:       $('#mys_js__basket')
  });
  basketView.render();  

  products.fetch();
  //new BasketProduct()
  //listen products
  // when quantity change >0 new : ++
});
