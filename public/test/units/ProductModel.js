define(function(require) {
  'use strict';
  
  var ProductModel = require('./../../js/models/Product');
  var DBProducts = require('../units/DBProducts');

  describe('ProductModel', function() {

    describe('DBORM mapping', function() {

      var productModel = new ProductModel();
      productModel.fromDbORM(DBProducts[0]);

      it('name property', function() {
        var name = productModel.get('name');
        name.should.equal(DBProducts[0].Name);
      });

      it('promotions array', function() {
        var proms = productModel.get('promotions');
        proms.should.be.instanceOf(Array)
          .with.length(1)
          .with.deep.property('[0].type', 'Reward');
      });

    });

  });

});