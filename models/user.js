const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  addToCart(product){
    
    // const cartProduct = this.cart.items.findIndex(cp=> cp._id === product._id);

    const updatedCart = {items: [{productId: new ObjectID(product._id), quantity: 1}]};
    const db = getDb();
   return db.collection('users').updateOne({_id: new ObjectID(this._id)}, {$set: {cart: updatedCart}})
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({_id: new ObjectID(userId)}).then(user=>{
      // console.log(user)
      return user;
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = User;

