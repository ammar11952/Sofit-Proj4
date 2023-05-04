const Beneficiary = require('../db/beneficiary');
const Account = require('../db/account');

const verifyBankAcc = async (accNo) => {
  const getAccount = Account.find({ accNo })
    .then((doc) => doc)
    .catch((err) => Error('Bank Acc no not verified!'));
  return getAccount;
};

const postBeneficiaryController = async (req, res) => {
  console.log('PostBeneficiaryController');
  const beneficiaryAccId = await verifyBankAcc(req.body.accNo);
  //   console.log('Benig Acc ID: ', beneficiaryAccId[0]._id);
  const postBeneficiary = Beneficiary.create({
    initiatorUserId: req.mwAuthUserId,
    beneficiaryAccId: beneficiaryAccId[0]._id,
    name: req.body.name,
    contact: req.body.contact,
  })
    .then((doc) => {
      console.log('Successful: postBeneficiary');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('postBeneficiary Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const deleteBeneficiaryController = async (req, res) => {
  const deleteBeneficiary = Beneficiary.findOneAndDelete({
    userId: req.mwAuthUserId,
    ...req.body,
  })
    .then((doc) => {
      console.log('Successful: deleteBeneficiary');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('deleteBeneficiary Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const getBeneficiaryController = async (req, res) => {
  const getBeneficiary = Beneficiary.find({
    initiatorUserId: req.mwAuthUserId,
    ...req.body,
  })
    .then((doc) => {
      console.log('Successful: getBeneficiary');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('getBeneficiary Error: ', err.message);
      res.status(400).send(err.message);
    });
};
const putBeneficiaryController = async (req, res) => {
  //   let updateParameter;
  //   if (req.body.hasOwnProperty('accNo')) {
  //     const beneficiaryAccId = await verifyBankAcc(req.body.accNo);
  //     delete req.body.accNo;
  //     updateParameter = { beneficiaryAccId, ...req.body };
  //   } else updateParameter = req.body;

  //   console.log(updateParameter);

  //   Beneficiary.findOneAndUpdate(
  //     { initiatorUserId: req.mwAuthUserId, _id: req.param.id },
  //     updateParameter
  //   )
  //     .then((doc) => {
  //       console.log(doc);
  //       console.log('Successful: putBeneficiary');
  //       return Beneficiary.findById(req.param.id);
  //     })
  //     .then((doc) => res.status(200).send(doc))
  //     .catch((err) => {
  //       console.log('putBeneficiary Error: ', err.message);
  //       res.status(400).send(err.message);
  //     });

  res.status(404).send(Error('This API is under maintainaince!'));
};

module.exports = {
  postBeneficiaryController,
  deleteBeneficiaryController,
  getBeneficiaryController,
  putBeneficiaryController,
};
