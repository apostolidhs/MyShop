define(function(require) {
  'use strict';

  var _ = require('underscore');
  var ProductModel = require('./../../js/models/Product');
  var ProductCollection = require('./../../js/collections/Products');
  var DBProducts = require('../units/DBProducts');

  describe('ProductCollection', function() {

    var productCollection = new ProductCollection();
    _.each(DBProducts, function(DBProduct) {
      var productModel = new ProductModel();
      productModel.fromDbORM(DBProduct);
      productCollection.add(productModel);
    });

    describe('correctly added values', function() {

      it('contain 3 products', function() {
        productCollection.length.should.equal(3);
      });

      it('products with isFavourite as default sorting', function() {
        var prevFavour = true;
        productCollection.each(function(product) {
          var favour = product.get('isFavourite');
          if(favour===true && prevFavour===false) {
            favour.should.be.false;
          }
        });
      });

    });

  });

});