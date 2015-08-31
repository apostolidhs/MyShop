define(function(require) {
  'use strict';

  var ProductModel = require('./../../js/models/Product');
  var DBProducts = require('../units/DBProducts');
  var ProductView = require('./../../js/views/Product');

  var DBProduct = DBProducts[0];
  var productModel = new ProductModel();
  productModel.fromDbORM(DBProduct);
  var productView = new ProductView({model: productModel});
  productView.render();

  describe('ProductView', function() {

    describe('properties correctly rendered', function() {

      it('image', function() {
        var img = productView.$el.find('.mys_js__product-img');
        img.should.have.attr('src', productModel.get('image'));
      });

      it('name', function() {
        var nameTxt = productView.$el.find('.mys_js__product-info-name').text();
        nameTxt.should.be.a('string');
        // if name is too long it collapsed
        nameTxt.substr(0, 20).should.equal(
          productModel.get('name').substr(0, 20));
      });

      it('review promotion', function() {
        var prom = productView.$el.find('.mys_js__product-info-promReward');
        prom.should.have.text(productModel.get('promotions')[0].description);
      });

    });

    describe('view elements interaction triggers model', function() {

      it('plus button click -> raise model.basketQty', function() {
        var prevBasketQty = productModel.get('basketQty');
        productView.$el.find('.mys_js__product-order-detailBasketAdd').click();
        var basketQty = productModel.get('basketQty');
        basketQty.should.be.above(prevBasketQty);
      });

    });

    describe('view elements interaction', function() {

      it('quantity input 0 -> minus btn disabled', function() {
        var input = productView.$el.find('.mys_js__product-order-detailQtyinput');
        input.val(0).change(); // emulate input from user    
        var minusBtn = productView.$el.find('.mys_js__product-order-detailQtyMinusbtn');
        minusBtn.should.have.prop('disabled', true);
      });

      it('quantity input >0 -> minus btn enabled', function() {
        var input = productView.$el.find('.mys_js__product-order-detailQtyinput');
        input.val(3).change(); // emulate input from user 
        var minusBtn = productView.$el.find('.mys_js__product-order-detailQtyMinusbtn');
        minusBtn.should.have.prop('disabled', false);
      });

    });

  });

});