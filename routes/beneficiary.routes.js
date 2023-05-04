const router = require('express').Router();
const requireAuth = require('../auth.middleware');
const controller = require('../controller/account.controller');

router.route('/create').post(requireAuth, controller.postAccountController);
router.route('/get').get(requireAuth, controller.getAccountController);
router.route('/delete').delete(requireAuth, controller.deleteAccountController);
router.route('/update/').put(requireAuth, controller.putAccountController);

module.exports = router;
