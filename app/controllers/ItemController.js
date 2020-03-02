const Item = require("../models/Item");
const Collection = require("../models/Collection");

exports.createItem = async (apiRequest, apiResponse, next) => {
  let item = await Collection.findOne({ name: apiRequest.body.name, createdBy: apiRequest.user._id });
  if(item && item._id) {
    apiResponse.status(400).json({ message: "Item already exists." });
    return next();
  }    
  item = new Item({name: apiRequest.body.name, createdBy: apiRequest.user._id, collection: apiRequest.body.collectionId});
  item = await item.save();    
  apiResponse.status(201).json({ data: item, message: "Item successfully created." });
  return next();
};

exports.getAllItems = async(apiRequest, apiResponse, next) => {
  const items = await Item.find({createBy: apiRequest.user._id});
  apiResponse.status(200).json(items);
  return next();
};

exports.getItemDetails =  async(apiRequest, apiResponse, next) => {
  const item = await Item.findOne({_id: apiRequest.params.itemId});    
  apiResponse.status(200).json(item ? item : {});
  return next();
};

exports.updateItemDetails = async(apiRequest, apiResponse, next) => {
  if(!apiRequest.body.id){
    apiResponse.status(400).json({message: "item id is required."});
    return next();
  }
  let updatedData = {}

  if(apiRequest.body.name){
    updatedData.name = apiRequest.body.name
  }

  if(apiRequest.body.collectionId){
    updatedData.collection = apiRequest.body.collectionId;
  }

  let item = await Item.findOneAndUpdate({_id: apiRequest.body.id}, updatedData, {useFindAndModify: false, new: true})
  if(item.collection){
    await Collection.findOneAndUpdate({_id: item.collection}, {$push: {items: item._id}}, {useFindAndModify: false, new: true})    
  }
  apiResponse.status(200).json(item ? item: {});
  return next();
};

exports.deleteItem = async(apiRequest, apiResponse, next) => {
  await Item.findByIdAndDelete(apiRequest.params.id);
  apiResponse.status(200).json({message: "Item has been deleted."});
  return next();
};
