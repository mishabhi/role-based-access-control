const Group = require("../models/Group");

exports.createGroup = async (apiRequest, apiResponse, next) => {
  let group = await Group.findOne({
    name: apiRequest.body.name,
    createdBy: apiRequest.user._id,
    groupManager: apiRequest.body.groupManager    
  });
  if (group && group._id) {
    apiResponse.status(400).json({ message: "Group already exists." });
    return next();
  }
  group = new Group({ name: apiRequest.body.name, createdBy: apiRequest.user._id, groupManager: apiRequest.body.groupManager });
  group = await group.save();
  apiResponse.status(201).json({ data: group, message: "Group successfully created." });
  return next();
};

exports.getAllGroups = async (apiRequest, apiResponse, next) => {
  const groups = await Group.find({ createdBy: apiRequest.user._id });
  apiResponse.status(200).json(groups);
  return next();
};

exports.getGroupDetails = async (apiRequest, apiResponse, next) => {
  const group = await Group.findOne({ _id: apiRequest.params.groupId });
  apiResponse.status(200).json(group ? group : {});
  return next();
};

exports.updateGroupDetails = async (apiRequest, apiResponse, next) => {
  let group = await Group.findOneAndUpdate({ _id: apiRequest.body.id });
  apiResponse.status(200).json({ group: group, message: "Group has been updated." });
  return next();
};

exports.deleteGroup = async (apiRequest, apiResponse, next) => {
  await Group.findOneAndDelete({ _id: apiRequest.params.groupId });
  apiResponse.status(200).json({ message: "Group has been deleted." });
  return next();
};
