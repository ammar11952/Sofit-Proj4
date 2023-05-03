const router = require('express').Router();
const controller = require('../controller/user.controller');

router.route('/signup').post(controller.postUserController);
router.route('/get').get(controller.getUserController);
router.route('/delete').delete(controller.deleteUserController);
router.route('/update/:id').put(controller.putUserController);

module.exports = router;
