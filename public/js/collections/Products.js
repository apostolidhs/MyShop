define( 
[
  'underscore',
  'backbone',
  'models/Product',
],
function(_, Backbone, ProductModel) {
  'use strict';


  var Model = Backbone.Collection.extend({
    initialize: function(localStorage) {
      this.localStorage = localStorage;
    },
    model: ProductModel,
    comparator: 'IsFavourite'
  });

  return Model;
});