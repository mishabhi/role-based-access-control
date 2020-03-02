const Mongoose = require('mongoose');

const Collection = new Mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true    
  },
  items: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "Item"      
    }
  ],
  createdBy: {    
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User"          
  },
  group: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Group"
  }
})

module.exports = Mongoose.model('Collection', Collection);