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

    initiate: function() {

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
      return this;
    }
  });

  return View;
});