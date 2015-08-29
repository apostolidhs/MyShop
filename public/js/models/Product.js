define( 
[
  'underscore',
  'backbone'
],
function(_, Backbone) {
  'use strict';

  var Model = Backbone.Model.extend({
    defaults: {
      name:         '',
      description:  '',
      price:        0.0,
      unitPrice:    0.0,
      unitType:     '',
      basketQty:    0,
      isFavourite:  true,
      promotions:   [],
      image:        ''
    },

    fromDbORM: function(dbProd) {
      this.set({
        name: dbProd.Name,
        description: dbProd.Description,
        price: dbProd.Price,
        unitPrice: dbProd.UnitPrice,
        unitType: dbProd.unitType,
        basketQty: dbProd.BasketQty,
        isFavourite: dbProd.IsFavourite,
        promotions: _.map(dbProd.Promotions, function(prom){
          return {
            id: prom.Id,
            description: prom.Description,
            type: prom.Type
          };
        }),
        image: dbProd.Image
      });
    }
  });

  return Model;
});