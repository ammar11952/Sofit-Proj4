const router = require('express').Router();

router.use('/user', require('./user.routes'));
router.use('/beneficiary', require('./beneficiary.routes'));
router.use('/account', require('./account.routes'));
router.use('/transaction', require('./transaction.routes'));
router.get(
  '/receipt/get',
  require('../auth.middleware'),
  require('../receipt/receipt.js')
);

module.exports = router;
