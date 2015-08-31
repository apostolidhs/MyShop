define( function() {
  'use strict';

  return [{
    "Id": 1,
    "Name": "name1",
    "Description": "desc1",
    "Price": 1.00,
    "UnitPrice": 0.1,
    "unitType": "each",
    "BasketQty": 0,
    "IsFavourite": true,
    "Promotions": [
        {
            "Id": 1,
            "Description": "promsDesc1",
            "Type": "Reward"
        }
    ],
    "Image": "./img/fakeimg.jpg"
  },{
    "Id": 2,
    "Name": "name2",
    "Description": "desc2",
    "Price": 10.00,
    "UnitPrice": 0.2,
    "unitType": "each",
    "BasketQty": 1,
    "IsFavourite": false,
    "Promotions": [
        {
            "Id": 2,
            "Description": "promsDesc2",
            "Type": "Reward"
        },
        {
            "Id": 3,
            "Description": "promsDesc3",
            "Type": "Ecoupon"
        }
    ],
    "Image": "./img/fakeimg.jpg"
  },{
    "Id": 3,
    "Name": "name3",
    "Description": "desc3",
    "Price": 3.00,
    "UnitPrice": 0.3,
    "unitType": "each",
    "BasketQty": 3,
    "IsFavourite": true,
    "Promotions": [
        {
            "Id": 4,
            "Description": "promsDesc4",
            "Type": "Reward"
        },
        {
            "Id": 5,
            "Description": "promsDesc5",
            "Type": "Ecoupon"
        }
    ],
    "Image": "./img/fakeimg.jpg"
  }];
});