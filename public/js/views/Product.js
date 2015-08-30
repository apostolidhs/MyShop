define( 
[
  'underscore',
  'backbone',
  'text!templates/Product.html'
],
function(_, Backbone, ProductTemplate) {
  'use strict';

  var View = Backbone.View.extend({
    className: 'mys_f__product pull-left',

    template: _.template(ProductTemplate),

    initialize: function() {
      this.listenTo(this.model, 'change:basketQty', this.refreshBasketQty);
    },

    render: function() {
      var proms = this.model.get('promotions');
      var promReward = _.filter(proms, function(prom) {
        return prom.type === 'Reward';
      });
      var promEcoupon = _.filter(proms, function(prom) {
        return prom.type === 'Ecoupon';
      });
      this.$el.html(
        this.template({
          model: this.model.toJSON(),
          promReward: promReward,
          promEcoupon: promEcoupon
        })
      );
      this.setQtyinputVal(1);
      this.refreshBasketQty();
      return this;
    },

    events: {
      'click .mys_js__product-order-detailQtnMinusbtn': 'refreshQtyMinus',
      'click .mys_js__product-order-detailQtnPlusbtn': 'refreshQtyPlus',
      'change .mys_js__product-order-detailQtyinput': 'refreshQtyInput',
      'click .mys_js__product-order-detailBasketAdd': 'onBasketQtyChange',
      'click .mys_js__product-order-shopList': 'notImplementWarning',
      'click .mys_js__product-order-restShelf': 'notImplementWarning'
    },

    setQtyinputVal: function(val) {
      var qtyInput = this.$el.find('.mys_js__product-order-detailQtyinput');
      qtyInput.val(val);
      qtyInput.change();
    },

    refreshQtyMinus: function() {
      var qtyVal = +this.$el.find('.mys_js__product-order-detailQtyinput').val();
      if(qtyVal>1) {
        --qtyVal;
        this.$el.find('.mys_js__product-order-detailQtnMinusbtn').prop('disabled', false);
      }else {
        qtyVal = 0;
        this.$el.find('.mys_js__product-order-detailQtnMinusbtn').prop('disabled', true);
      }
      this.setQtyinputVal(qtyVal);
    },

    refreshQtyPlus: function() {
      var qtyVal = +this.$el.find('.mys_js__product-order-detailQtyinput').val();
      this.$el.find('.mys_js__product-order-detailQtnMinusbtn').prop('disabled', false);
      this.setQtyinputVal(qtyVal+1);
    },

    refreshQtyInput: function() {
      var qtyVal = +this.$el.find('.mys_js__product-order-detailQtyinput').val();
      if(qtyVal<1) {
        qtyVal = 0;
        this.$el.find('.mys_js__product-order-detailQtyinput').val(qtyVal);
      }
    },

    onBasketQtyChange: function() {
      var qtyVal = +this.$el.find('.mys_js__product-order-detailQtyinput').val();
      var basketQty = this.model.get('basketQty');
      this.model.set('basketQty', basketQty+qtyVal);
    },

    refreshBasketQty: function() {
      var basketQty = this.model.get('basketQty');
      if(basketQty>0) {
        this.$el.find('.mys_js__product-inBasket-qty').text(basketQty);
        this.$el.find('.mys_js__product-order').addClass('mys_is__product-orderInBasket');
        this.$el.find('.mys_js__product-inBasket-content').show();
      }else {
        this.$el.find('.mys_js__product-inBasket-content').hide();
        this.$el.find('.mys_js__product-order').removeClass('mys_is__product-orderInBasket');
      }
    },

    notImplementWarning: function() {
      alert('Demo, this functionality has not implemented');
    }
  });

  return View;
});