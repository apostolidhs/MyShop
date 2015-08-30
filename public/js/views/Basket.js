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
    },

    render: function() {
      this.$el.html(
        this.template()
      );
      return this;
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
    }

  });

  return View;
});