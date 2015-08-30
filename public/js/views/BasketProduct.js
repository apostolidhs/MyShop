define( 
[
  'underscore',
  'backbone',
  'text!templates/BasketProduct.html'
],
function(_, Backbone, BasketProductTemplate) {
  'use strict';

  var View = Backbone.View.extend({

    className: 'mys_f__basket-product',

    template: _.template(BasketProductTemplate),

    initialize: function() {
      this.listenTo(this.model, 'change:basketQty', this.refreshProductQty);
    },

    render: function() {
      this.$el.html(
        this.template({
          model: this.model.toJSON()
        })
      );
      this.refreshProductQty();
      this.refreshQtyMinusBtn();
      return this;
    },

    events: {
      'click .mys_js__product-order-detailQtnMinusbtn': 'refreshQtyMinus',
      'click .mys_js__product-order-detailQtnPlusbtn': 'refreshQtyPlus',
      'change .mys_js__product-order-detailQtyinput': 'refreshQtyInput',
      'click .mys_js__basket-product-infoClose': 'closeBasketProduct'
    },

    refreshProductQty: function() {
      var basketQty = this.model.get('basketQty');
      var price = this.model.get('price');
      this.$el.find('.mys_js__product-order-detailQtyinput').val(basketQty);
      var totalPrice = (price*basketQty).toFixed(2);
      this.$el.find('.mys_js__basket-product-orderPrice').text(totalPrice);  
    },

    refreshQtyMinusBtn: function() {
      var basketQty = this.model.get('basketQty');
      if(basketQty>2) {
        this.$el.find('.mys_js__product-order-detailQtnMinusbtn').prop('disabled', false);
      }else {
        this.$el.find('.mys_js__product-order-detailQtnMinusbtn').prop('disabled', true);
      }
    },

    refreshQtyMinus: function() {
      this.refreshQtyMinusBtn();
      var basketQty = this.model.get('basketQty');
      this.model.set('basketQty', Math.max(1, basketQty-1));
    },

    refreshQtyPlus: function() {
      var basketQty = this.model.get('basketQty');
      this.$el.find('.mys_js__product-order-detailQtnMinusbtn').prop('disabled', false);
      this.model.set('basketQty', basketQty+1);
    },

    closeBasketProduct: function() {
      this.remove();
      this.model.set('basketQty', 0);
    },

    refreshQtyInput: function() {
      var qtyVal = +this.$el.find('.mys_js__product-order-detailQtyinput').val();
      qtyVal = Math.max(1, qtyVal-1);
      this.$el.find('.mys_js__product-order-detailQtyinput').val(qtyVal);
    }

  });

  return View;
});