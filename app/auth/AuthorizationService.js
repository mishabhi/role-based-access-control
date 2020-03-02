const Roles = require('../config/roles');
const Permissions = require('../auth/Permission');
const permissions = new Permissions();

exports.authorize = (operation) => {
  return (request, response, next) => {     
    let isAllowed = permissions.can(request.user.roles, operation, request);      
    if(isAllowed === true){
      return next();
    } 
    return response.status(403).json({ message: 'Access Forbidden' });               
  };
}

