const Collection = require("../models/Collection");
const Group = require("../models/Group");

exports.createCollection = async (apiRequest, apiResponse, next) => {
  let collection = await Collection.findOne({ name: apiRequest.body.name, createdBy: apiRequest.user._id });
  if(collection && collection._id) {
    apiResponse.status(400).json({ message: "Collection already exists." });
    return next();
  }    
  collection = new Collection({name: apiRequest.body.name, createdBy: apiRequest.user._id, group: apiRequest.body.groupId});
  collection = await collection.save();    
  apiResponse.status(201).json({ data: collection, message: "Collection successfully created." });
  return next();
};

exports.getAllCollections = async(apiRequest, apiResponse, next) => {
  const collections = await Collection.find({createBy: apiRequest.user._id});
  apiResponse.status(200).json(collections);
  return next();
};

exports.getCollectionDetails =  async(apiRequest, apiResponse, next) => {
  const collection = await Collection.findOne({_id: apiRequest.params.collectionId});    
  apiResponse.status(200).json(collection ? collection : {});
  return next();
};

exports.updateCollectionDetails = async(apiRequest, apiResponse, next) => {

  if(!apiRequest.body.id){
    apiResponse.status(400).json({message: "collection id is required."});
    return next();
  }
  let updatedData = {}

  if(apiRequest.body.name){
    updatedData.name = apiRequest.body.name
  }

  if(apiRequest.body.groupId){
    updatedData.group = apiRequest.body.groupId;
  }

  let collection = await Collection.findOneAndUpdate({_id: apiRequest.body.id}, updatedData, {useFindAndModify: false, new: true})
  if(collection.group){
    await Group.findOneAndUpdate({_id: collection.group}, {$push: {collections: collection._id}}, {useFindAndModify: false, new: true})    
  }
  apiResponse.status(200).json(collection ? collection: {});
  return next();
};

exports.deleteCollection = async(apiRequest, apiResponse, next) => {
  await Collection.findByIdAndDelete(apiRequest.params.id);
  apiResponse.status(200).json({message: "Collection has been deleted"});
};
