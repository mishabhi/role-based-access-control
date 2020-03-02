const User = require("../models/User");
const Group = require("../models/Group");
const Collection = require("../models/Collection");
const Item = require("../models/Item");

const AuthenticationService = require("../auth/AuthenticationService");

exports.createUser = async(apiRequest, apiResponse, next) => {
  try {            
    let { roles, email, password } = apiRequest.body;   
    let user = await User.findOne({ email: email });
    if (user && user._id) {
      apiResponse.status(400).json({ message: "Email already exists." });
      return next();
    }
    const encodePassword = await AuthenticationService.encodePassword(password);

    if(!roles instanceof Array){
      apiResponse.status(400).json({ message: "Please provide valid roles." });
      return next();
    } 

    user = new User({ createdBy: apiRequest.user && apiRequest.user.id ,email, password: encodePassword, roles: Array.from(new Set(roles))});
    user = await user.save();
    //user.accessToken = AuthenticationService.generateToken(user); //This will be used for signup    
    apiResponse.status(201).json({ data: user, message: "You have successfully signed up." });
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.login = async (apiRequest, apiResponse, next) => {
  try {
    const { email, password } = apiRequest.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return apiResponse.status(401).json({ message: "Email does not exist." });
    }
    const validPassword = await AuthenticationService.validatePassword(password, user.password);
    if (!validPassword) {
      return apiResponse.status(401).json({ message: "Incorrect Password." });
    }
    user.accessToken = AuthenticationService.generateToken(user);    
    apiResponse.status(200).json({ data: user});
    return next();
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async(apiRequest, apiResponse, next) => {
  const users = await User.find({createdBy: apiRequest.user._id});
  apiResponse.status(200).json(users);
  return next();
};

exports.getUserDetails = async(apiRequest, apiResponse, next) => {
  const user = await User.findById(apiRequest.params.userId);
  if(!user){
    apiResponse.status(404).json({message: "User does not exist."});
    return next();
  }
  apiResponse.status(200).json(user);
  return next();
};

exports.updateUserDetails = async(apiRequest, apiResponse, next) => {
  let updatedData = {}
  if(apiRequest.body.roles){
    updatedData.roles = apiRequest.body.roles
  }  
  
  if(apiRequest.body.email){
    updatedData.email = apiRequest.body.email;
  }    
  let user = await User.findOneAndUpdate({_id: apiRequest.body.id}, updatedData, {useFindAndModify: false, new: true});    
  apiResponse.status(200).json(user);
  return next();
};

exports.deleteUser = async (apiRequest, apiResponse, next) => {  
  await User.findOneAndDelete({_id: apiRequest.params.userId});
  apiResponse.status(200).json({message: "User has been deleted"});
  return next();
};
