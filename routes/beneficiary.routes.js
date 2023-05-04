const router = require('express').Router();
const requireAuth = require('../auth.middleware');
const controller = require('../controller/beneficiary.controller');

router.route('/create').post(requireAuth, controller.postBeneficiaryController);
router.route('/get').get(requireAuth, controller.getBeneficiaryController);
router
  .route('/delete')
  .delete(requireAuth, controller.deleteBeneficiaryController);
router
  .route('/update/:id')
  .put(requireAuth, controller.putBeneficiaryController);

module.exports = router;
