const router = require('express').Router();
const CollectionController = require('../controllers/CollectionController');
const Resources = require('../config/resources');
const AuthorizationService = require("../auth/AuthorizationService");

router.post(Resources.collection.create.path, AuthorizationService.authorize("create:collection"), CollectionController.createCollection);
router.put(Resources.collection.update.path, AuthorizationService.authorize("update:collection"), CollectionController.updateCollectionDetails);
router.get(Resources.collection.details.path, AuthorizationService.authorize("read:collection"), CollectionController.getCollectionDetails);
router.get(Resources.collection.all.path, AuthorizationService.authorize("list:collection"), CollectionController.getCollectionDetails);
router.delete(Resources.collection.delete.path, AuthorizationService.authorize("delete:collection"), CollectionController.deleteCollection);

module.exports = router;
