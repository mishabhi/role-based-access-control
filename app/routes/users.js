const router = require('express').Router();
const UserController = require('../controllers/UserController');
const AuthorizationService = require('../auth/AuthorizationService');
const Resources = require('../config/resources');

router.post(Resources.user.login.path, UserController.login);
router.post(Resources.user.create.path, AuthorizationService.authorize("create:user"), UserController.createUser);
router.get(Resources.user.details.path, AuthorizationService.authorize("read:user"), UserController.getUserDetails);
router.get(Resources.user.all.path, AuthorizationService.authorize("list:user"), UserController.getAllUsers);
router.put(Resources.user.update.path, AuthorizationService.authorize("update:user"), UserController.updateUserDetails);
router.delete(Resources.user.delete.path, AuthorizationService.authorize("delete:user"), UserController.deleteUser);

module.exports = router;
