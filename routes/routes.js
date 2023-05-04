const router = require('express').Router();

router.use('/user', require('./user.routes'));
router.use('/beneficiary', require('./beneficiary.routes'));
router.use('/account', require('./account.routes'));
// router.use('/transaction', require('./transaction.routes'));

module.exports = router;
