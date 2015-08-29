define( 
[
  'underscore',
  'backbone',
  'views/Product',
  'text!templates/Products.html'
],
function(_, Backbone, ProductView, ProductsTemplate) {
  'use strict';

  var View = Backbone.View.extend({

    template: _.template(ProductsTemplate),

    initialize: function(args) {
      this.products = args.products;
      this.listenTo(this.products, 'add', this.addProduct);
      this.listenTo(this.products, 'reset', this.addAllProducts);
    },

    render: function() {
      this.$el.html(
        this.template()
      );
      this.$el.find('#mys_js__products-sortBy-action').dropdown();
      return this;
    },

    addProduct: function(product) {
      var productView = new ProductView({model: product});
      this.$el.find('.mys_js__products-wrapper').append(productView.render().el);
    },

    addAllProducts: function() {
      this.products.each(this.addProduct, this);
    }
  });

  return View;
});