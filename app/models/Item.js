const Mongoose = require('mongoose');

const Item = new Mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true    
  }
})

module.exports = Mongoose.model('Item', Item);