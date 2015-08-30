define( 
[
  'underscore',
  'backbone',
  'views/BasketProduct',
  'text!templates/Basket.html'
],
function(_, Backbone, BasketProduct, BasketTemplate) {
  'use strict';

  var View = Backbone.View.extend({

    template: _.template(BasketTemplate),

    initialize: function(args) {
      this.products = args.products;
      this.listenTo(this.products, 'add', this.addBasketProduct);
      this.listenTo(this.products, 'change:basketQty', this.productQtyChanged);
      this.setViewSize(args.isLargeView);
    },

    render: function() {
      this.$el.html(
        this.template()
      );
      return this;
    },

    events: {
      'click .mys_js__basket-header': 'toggleIfSmallView'
    },

    addBasketProduct: function(product) {
      var basketQty = product.get('basketQty');
      if(basketQty>0) {
        var basketProductView = new BasketProduct({model: product});
        this.$el.find('.mys_js__basket-products').append(basketProductView.render().el);
        this.refreshTotalBasketQty();
      }
    },    

    productQtyChanged: function(product) {
      var prevBasketQty = product.previous('basketQty');
      var basketQty = product.get('basketQty');
      if(prevBasketQty===0 && basketQty>0) {
        this.addBasketProduct(product);
      }

      this.refreshTotalBasketQty();
    },

    refreshTotalBasketQty: function() {
      var total = this.products.reduce(function(sum, product){
        return sum + product.get('basketQty');
      }, 0);
      this.$el.find('.mys_js__basket-headerBasketQty').text(total);
    },

    setViewSize: function(isLargeView) {
      this.isLargeView = isLargeView;
    },

    toggleIfSmallView: function() {
      if(!this.isLargeView) {
        if(this.$el.hasClass('mys_is__basket-smallView-extend')) {
          this.$el.removeClass('mys_is__basket-smallView-extend')
        }else {
          this.$el.addClass('mys_is__basket-smallView-extend')
        }
      }
    }

  });

  return View;
});