const router = require('express').Router();
const requireAuth = require('../auth.middleware');
const controller = require('../controller/beneficiary.controller');

router.route('/create').post(requireAuth, controller.);
router.route('/get').post(requireAuth,controller.);
router.route('/delete').delete(requireAuth, controller.);
router.route('/update').put(requireAuth, controller.);

module.exports = router;
