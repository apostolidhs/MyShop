define(function(require) {
  'use strict';

  var _ = require('underscore');
  var Bootstrap = require('bootstrap');

  var ProductModel = require('./../../js/models/Product');
  var ProductCollection = require('./../../js/collections/Products');
  var ProductsView = require('./../../js/views/Products');
  var BasketView = require('./../../js/views/Basket');
  var DBProducts = require('../units/DBProducts');


  var productCollection = new ProductCollection();

  var productsView = new ProductsView({
    products: productCollection,
    el:       $('<div id="fakeProductCollectionId">')
  });
  productsView.render();

  var basketView = new BasketView({
    products: productCollection,
    isLargeView: true,
    el:       $('<div id="fakeBasketId">')
  });
  basketView.render();  

  _.each(DBProducts, function(DBProduct) {
    var productModel = new ProductModel();
    productModel.fromDbORM(DBProduct);
    productCollection.add(productModel);
  });

  describe('BasketView', function() {

    describe('basket header', function() {

      it('basket quantity sum is 4', function() {
        var qtySum = basketView.$el.find('.mys_js__basket-headerBasketQty');
        qtySum.should.have.text('4');
      });

    });

    describe('basket products', function() {

      var basketShouldContain = function(len) {
        var basketProducts = basketView.$el.find('.mys_js__basket-product');
        basketProducts.should.have.length(len);
      };

      //cache first item
      var basketProduct = $(basketView.$el.find('.mys_js__basket-product').get(0));
      var basketModel = productCollection.at(1);

      it('basket contains 2 products', function() {
        basketShouldContain(2);
      });

      it('basket quantity raise on plus button clicked', function() {
        var prevBasketQty = basketModel.get('basketQty');
        basketProduct.find('.mys_js__product-order-detailQtyPlusbtn').click();
        var basketQty = basketModel.get('basketQty');
        basketQty.should.be.above(prevBasketQty);
      });

      it('append product on basket when add btn clicked', function() {
        basketShouldContain(2);
        var productNotInBasket = productsView.$el.find('.mys_js__product-order-detailBasketAdd').get(0);
        $(productNotInBasket).click();
        basketShouldContain(3);
      });

      it('basket product dismissed when x btn clicked', function() {
        basketProduct.find('.mys_js__basket-product-infoClose').click();
        basketShouldContain(2);
      });

    });

  });

});