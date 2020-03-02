const Mongoose = require('mongoose');
const Roles = require('../config/roles');

const User = new Mongoose.Schema({ 
  email: {
    type: String,
    required: true,
    trim: true    
  },
  password: {
    type: String,
    required: true
  },
  createdBy: {    
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User"          
  },
  roles:[
    {
      type: String,      
      enum: [Roles.GLOBAL_MANAGER, Roles.GROUP_MANAGER, Roles.MANAGER, Roles.REGULAR]       
    }
  ],
  groups: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Group"
    }
  ]
})

User.methods.toJSON = function() {
  let userData = this.toObject();
  delete userData.password;
  if(this.accessToken) 
    userData.accessToken = this.accessToken;
  return userData;
 }

module.exports = Mongoose.model('user', User);
