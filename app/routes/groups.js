const router = require('express').Router();
const GroupController = require('../controllers/GroupController');
const AuthorizationService = require('../auth/AuthorizationService');
const Resources = require('../config/resources');

router.post(Resources.group.create.path, AuthorizationService.authorize("create:group"), GroupController.createGroup);
router.put(Resources.group.update.path, AuthorizationService.authorize("update:group"), GroupController.updateGroupDetails);
router.get(Resources.group.details.path, AuthorizationService.authorize("read:group"), GroupController.getGroupDetails);
router.get(Resources.group.all.path, AuthorizationService.authorize("list:group"), GroupController.getAllGroups);
router.delete(Resources.group.delete.path, AuthorizationService.authorize("delete:group"), GroupController.deleteGroup);

module.exports = router;
