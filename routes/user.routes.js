const router = require('express').Router();
const requireAuth = require('../auth.middleware');
const controller = require('../controller/user.controller');

router.route('/signup').post(controller.postUserController);
router.route('/login').post(controller.loginUserController);
router.route('/').get(requireAuth, controller.getUserController);
router.route('/').delete(requireAuth, controller.deleteUserController);
router.route('/').put(requireAuth, controller.putUserController);

module.exports = router;
