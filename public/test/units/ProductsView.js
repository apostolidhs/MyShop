define(function(require) {
  'use strict';

  var _ = require('underscore');
  var Bootstrap = require('bootstrap');

  var ProductModel = require('./../../js/models/Product');
  var ProductCollection = require('./../../js/collections/Products');
  var ProductsView = require('./../../js/views/Products');
  var DBProducts = require('../units/DBProducts');

  var productCollection = new ProductCollection();

  var productsView = new ProductsView({
    products: productCollection,
    el:       $('<div id="fakeProductCollectionId">')
  });
  productsView.render();

  _.each(DBProducts, function(DBProduct) {
    var productModel = new ProductModel();
    productModel.fromDbORM(DBProduct);
    productCollection.add(productModel);
  });

  describe('ProductsView', function() {

    describe('properties correctly rendered', function() {

      it('contain 3 product views', function() {
        var productViews = productsView.$el.find('.mys_js__product');
        productViews.should.have.length(3);
      });

      it('order by price', function() {
        productsView.$el.find('.mys_js__products-sortBy-methods [sort-method="price"]').click();
        productsView.$el.find('.mys_js__products-sortBy-actionbtn').click();
        var productViews = productsView.$el.find('.mys_js__product');
        var prevPrice = -1;
        productViews.each(function(idx, productView){
          var price = $(productView).find('.mys_js__product-order-priceItem strong').text();
          // £xxx
          var price = +price.substr(1);
          price.should.be.above(prevPrice);
          prevPrice = price;
        });
      });

    });

  });

});