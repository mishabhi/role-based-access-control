const Resources = {
  user: {
    login: {
      path: "/login", 
      method: "POST"        
    },
    create: {
      path: "/user",
      method: "POST"      
    },
    details: {
      path: "/user/:userId",
      method: "GET"   
    },
    update: {
      path: "/user",
      method: "PUT"   
    },
    delete: {
      path: "/user/:userId",
      method: "DELETE"   
    },
    all: {
      path: "/users/:groupId",
      method: "GET"   
    }        
  },
  collection: {
    create: {
      path: "/collection",
      method: "POST"
    },
    details: {
      path: "/collection/:collectionId",
      method: "GET"
    },
    update: {
      path: "/collection",
      method: "PUT"
    },
    delete: {
      path: "/collection/:collectionId",
      method: "DELETE"
    },
    all: {
      path: "/collections/:groupId",
      method: "GET"
    } 
  },
  item: {
    create: {
      path: "/item",
      method: "POST"
    },
    details: {
      path: "/item/:itemId",
      method: "GET"
    },
    update: {
      path: "/item",
      method: "PUT"
    },
    delete: {
      path: "/item/:itemId",
      method: "DELETE"
    },
    all: {
      path: "/items/groupId",
      method: "GET"
    } 
  },
  group: {
    create: {
      path: "/group",
      method: "POST"
    },
    details: {
      path: "/group/:groupId",
      method: "GET"
    },
    update: {
      path: "/group",
      method: "PUT"
    },
    delete: {
      path: "/group/:groupId",
      method: "DELETE"
    },
    all: {
      path: "/groups",
      method: "GET"
    } 
  }
}

module.exports = Resources;