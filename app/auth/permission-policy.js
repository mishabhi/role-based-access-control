const User = require("../models/User");
const Group = require("../models/Group");
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const Roles = require("../config/roles");
const Resources = require("../config/resources");

const hasPermissionToCrudUser = async(request) => {

  if(request.user.roles && request.user.roles.includes(Roles.GLOBAL_MANAGER)){
    return true;
  }
  
  if(request.router.path === Resources.user.create.path && request.method === Resources.user.create.method){
    return true;
  }

  if(request.router.path === Resources.user.update.path && request.method === Resources.user.update.method){
    let user = await User.findOne({_id: request.body.id});    
    return user.createdBy === request.user._id;
  }
  
  if(request.router.path === Resources.user.details.path && request.method === Resources.user.details.method){
    let user = await User.findOne({_id: request.params.userId});
    return user.createdBy === request.user._id;
  } 

  if(request.router.path === Resources.user.delete.path && request.method === Resources.user.delete.method){
    let user = await User.findOne({_id: request.params.userId});
    return user.createdBy === request.user._id;
  } 
  
  if(request.router.path === Resources.user.all.path && request.method === Resources.user.all.method){
    let group = await Group.findOne({_id: request.params.groupId})
    return group.groupManager === request.user._id;    
  }  

  return false;
}

const hasPermissionToCrudGroup = async(request) => {

  if(request.user.roles && !request.user.roles.includes(Roles.GLOBAL_MANAGER)){
    return false;
  }
  
  if(request.router.path === Resources.group.create.path && request.method === Resources.group.create.method){
    return true;
  }
  
  if(request.router.path === Resources.group.update.path && request.method === Resources.group.update.method){
    let group = await Group.findOne({_id: request.body.groupId})
    return group.createdBy === request.user._id;
  }
  
  if(request.router.path === Resources.group.details.path && request.method === Resources.group.details.method){
    let group = await Group.findOne({_id: request.params.groupId})
    return group.createdBy === request.user._id;
  }

  if(request.router.path === Resources.group.delete.path && request.method === Resources.group.delete.method){
    let group = await Group.findOne({_id: request.params.groupId})
    return group.createdBy === request.user._id;
  }
  
  if(request.router.path === Resources.group.all.path && request.method === Resources.group.all.method){
    let group = await Group.findOne({_id: request.params.groupId})
    return group.groupManager === request.user._id;
  }

  return false;
  
}

const hasPermissionToCrudCollection = async(request) => {

  if(request.user.roles && request.user.roles.includes(Roles.GLOBAL_MANAGER)){
    return true;
  }
  
  if(request.router.path === Resources.collection.create.path && request.method === Resources.collection.create.method){
     let group = await Group.findOne({_id: request.body.groupId})
     return group.groupManager === request.user._id;
  }
  
  if(request.router.path === Resources.collection.update.path && request.method === Resources.collection.update.method){
    let collection = await Collection.findOne({_id: request.body.collectionId});
    let group = await Group.findOne({_id: collection.group})
    return group.groupManager === request.user._id;
  }
  
  if(request.router.path === Resources.collection.details.path && request.method === Resources.collection.details.method){
    let collection = await Collection.findOne({_id: request.params.collectionId});
    let group = await Group.findOne({_id: collection.group})
    return group.groupManager === request.user._id;
  }

  if(request.router.path === Resources.collection.delete.path && request.method === Resources.collection.delete.method){
    let collection = await Collection.findOne({_id: request.params.collectionId});
    let group = await Group.findOne({_id: collection.group})
    return group.groupManager === request.user._id;
  }
  
  if(request.router.path === Resources.collection.all.path && request.method === Resources.collection.all.method){
    let group = await Group.findOne({_id: request.params.groupId})
    return group.groupManager === request.user._id;
  }
  return false;
}

const hasPermissionToCrudItem = async(request) => {

  if(request.user.roles && request.user.roles.includes(Roles.GLOBAL_MANAGER)){
    return true;
  }

  if(request.router.path === Resources.item.create.path && request.method === Resources.item.create.method){
     let collection = await Collection.findOne({_id: request.body.collectionId});
     let group = await Group.findOne({_id: collection.group})
     return group.groupManager === request.user._id;
  }
  
  if(request.router.path === Resources.item.update.path && request.method === Resources.item.update.method){
    let item = await Item.findOne({_id: request.body.itemId})
    let collection = await Collection.findOne({_id: item.collection});
    let group = await Group.findOne({_id: collection.group})
    return group.groupManager === request.user._id;
  }
  
  if(request.router.path === Resources.item.details.path && request.method === Resources.item.details.method){
    let item = await Item.findOne({_id: request.params.itemId})
    let collection = await Collection.findOne({_id: item.collection});
    let group = await Group.findOne({_id: collection.group})
    return group.groupManager === request.user._id;
  }

  if(request.router.path === Resources.item.delete.path && request.method === Resources.item.delete.method){
    let item = await Item.findOne({_id: request.params.itemId})
    let collection = await Collection.findOne({_id: item.collection});
    let group = await Group.findOne({_id: collection.group})
    return group.groupManager === request.user._id;
  }
  
  if(request.router.path === Resources.item.all.path && request.method === Resources.item.all.method){
    let collection = await Collection.findOne({_id: request.params.collectionId});
    let group = await Group.findOne({_id: collection.group})
    return group.groupManager === request.user._id;
  }
  return false;
}

exports.permissions = {
  GROUP_MANAGER: {
    can: [
      {
        name: 'create:collection',
        when: hasPermissionToCrudCollection
      },
      {
        name: 'update:collection',
        when: hasPermissionToCrudCollection
      },
      {
        name: 'read:collection',
        when: hasPermissionToCrudCollection
      },    
      {
        name: 'list:collection',
        when: hasPermissionToCrudCollection
      },  
      {
        name: 'delete:collection',
        when: hasPermissionToCrudCollection
      },
      {
        name: 'create:item',
        when: hasPermissionToCrudItem
      },
      {
        name: 'update:item',
        when: hasPermissionToCrudItem
      },
      {
        name: 'read:item',
        when: hasPermissionToCrudItem
      },
      {
        name: 'list:item',
        when: hasPermissionToCrudItem
      },
      {
        name: 'delete:item',
        when: hasPermissionToCrudItem
      },
      {
        name: 'create:user',
        when: hasPermissionToCrudUser
      },
      {
        name: 'update:user',
        when: hasPermissionToCrudUser
      },
      {
        name: 'read:user',
        when: hasPermissionToCrudUser
      },
      {
        name: 'list:user',
        when: hasPermissionToCrudUser
      },
      {
        name: 'delete:user',
        when: hasPermissionToCrudUser
      }
    ]
  },
  GLOBAL_MANAGER: {
    can: [      
      {
        name: 'create:group',
        when: hasPermissionToCrudGroup
      },
      {
        name: 'update:group',
        when: hasPermissionToCrudGroup
      },
      {
        name: 'read:group',
        when: hasPermissionToCrudGroup
      },
      {
        name: 'list:group',
        when: hasPermissionToCrudGroup
      },
      {
        name: 'delete:group',
        when: hasPermissionToCrudGroup
      }
    ],
    inherits: ["GROUP_MANAGER"]
  }
}

