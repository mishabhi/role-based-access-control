
class Permissions {

  constructor() {    
    this.init(require("./permission-policy"));
  }

  init(allowedPermissions) {
    let permissions = allowedPermissions.permissions

    if (typeof permissions !== "object") {
      throw new TypeError("Expected an object as input");
    }
    
    this.permissions = permissions;
    let map = {};
    Object.keys(permissions).forEach(permission => {
      map[permission] = {
        can: {}
      };
      if (permissions[permission].inherits) {
        map[permission].inherits = permissions[permission].inherits;
      }

      permissions[permission].can.forEach(operation => {
        map[permission].can[operation.name] = operation.when;
      });
    });

    this.permissions = map;
  }

  can(role, operation, request) {      
    if(Array.isArray(role)) {   
      return role.some(r => this.can(r, operation, request));      
    }

    //Check if role exists  
    if (!this.permissions[role]) {
      return false;
    }

    let allowedRole = this.permissions[role];

    //Check if this role has permission to requested operation
    if (allowedRole.can[operation]) {      
      return allowedRole.can[operation](request);
    }

    if (!allowedRole.inherits || allowedRole.inherits.length < 1) {
      return false;
    }

    //Check inherited roles until one returns true or all return false
    return allowedRole.inherits.some(childRole => this.can(childRole, operation, request));
  }
};

module.exports = Permissions;