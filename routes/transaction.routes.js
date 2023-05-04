const router = require('express').Router();
const requireAuth = require('../auth.middleware');
const controller = require('../controller/transaction.controller');

router
  .route('/create/:recId')
  .post(requireAuth, controller.postTransactionController);
router.route('/get').post(requireAuth, controller.getTransactionController);

module.exports = router;
