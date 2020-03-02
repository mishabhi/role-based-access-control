const Mongoose = require('mongoose');

const Group = new Mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    trim: true    
  },
  collections: [
    {
      type: Mongoose.Schema.Types.ObjectId,      
      ref: "Collection"      
    }
  ],
  createdBy: {    
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User"          
  },
  groupManager: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User" 
  },
  users: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User" 
    }
  ]
})

module.exports = Mongoose.model('Group', Group);