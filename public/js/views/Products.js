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
      //this.listenTo(this.products, 'add', this.addProduct);
      this.listenTo(this.products, 'sort', this.addAllProduct);
    },

    render: function() {
      this.$el.html(
        this.template()
      );
      this.$el.find('#mys_js__products-sortBy-action').dropdown();
      return this;
    },

    events: {
      'click .mys_js__products-sortBy-methods [sort-method]': 'onSortMethodChange',
      'click .mys_js__products-sortBy-actionbtn': 'reorderProducts'
    },

    addProduct: function(product) {
      var productView = new ProductView({model: product});
      this.$el.find('.mys_js__products-wrapper').append(productView.render().$el);
    },

    addAllProduct: function() {
      this.$el.find('.mys_js__products-wrapper').empty();
      this.products.each(this.addProduct, this);
    },

    onSortMethodChange: function(evt) {
      var selected = this.$el.find('#mys_js__products-sortBy-action');
      var selectedName = this.$el.find('#mys_js__products-sortBy-action .mys_js__products-sortBy-actionName');
      var target = $(evt.target);
      var targetSortMethod = target.attr('sort-method');
      var targetSortMethodTxt = target.text();

      target.attr('sort-method', selected.attr('sort-method'));
      target.text(selectedName.text());

      selected.attr('sort-method', targetSortMethod);
      selectedName.text(targetSortMethodTxt);
    },

    reorderProducts: function() {
      var targetSortMethod = this.$el.find('#mys_js__products-sortBy-action');
      this.products.comparator = targetSortMethod.attr('sort-method');
      this.products.sort();
    },



  });

  return View;
});