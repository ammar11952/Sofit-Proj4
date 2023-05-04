const Beneficiary = require('../db/beneficiary');
const Account = require('../db/account');

// const verifyBankAcc = async (accNo) => {
//   /*const getAccount = */ return Account.find({ accNo });
//   //     .then((doc) => doc)
//   //     .catch((err) => Error('Bank Acc no does not exist!'));
//   //   return getAccount;
// };

const postBeneficiaryController = async (req, res) => {
  console.log('PostBeneficiaryController');
  //   console.log(req.body);
  Account.findOne({ accNo: req.body.accNo })
    .then((doc) => {
      if (doc) {
        // console.log(doc);
        return Beneficiary.create({
          initiatorUserId: req.mwAuthUserId,
          beneficiaryAccId: doc._id,
          name: req.body.name,
          contact: req.body.contact,
        });
      } else throw Error('Incorrect Acc no in request or does not exist');
    })
    .then((doc) => {
      console.log('Successful: postBeneficiary');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('postBeneficiary Error: ', err.message);
      res.status(400).send(err.message);
    });

  //   //   console.log('Benig Acc ID: ', beneficiaryAccId[0]._id);
  //   const postBeneficiary = Beneficiary.create({
  //     initiatorUserId: req.mwAuthUserId,
  //     beneficiaryAccId: beneficiaryAccId[0]._id,
  //     name: req.body.name,
  //     contact: req.body.contact,
  //   })
  //     .then((doc) => {
  //       console.log('Successful: postBeneficiary');
  //       res.status(200).send(doc);
  //     })
  //     .catch((err) => {
  //       console.log('postBeneficiary Error: ', err.message);
  //       res.status(400).send(err.message);
  //     });
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
  //   res.status(404).send(Error('This API is under maintainaince!'));
  //   return;

  if (req.body.hasOwnProperty('accNo')) {
    Account.findOne({ accNo: req.body.accNo })
      .then((doc) => {
        delete req.body.accNo;
        return Beneficiary.findOneAndUpdate(
          {
            initiatorUserId: req.mwAuthUserId,
            beneficiaryAccId: req.param.id,
          },
          { beneficiaryAccId: doc._id, ...req.body }
        );
      })
      .then((doc) => res.status(200).send(doc))
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } else {
    Beneficiary.findOneAndUpdate(
      {
        initiatorUserId: req.mwAuthUserId,
        beneficiaryAccId: req.param.id,
      },
      req.body
    )
      .then((doc) => res.status(200).send(doc))
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
  return;

  console.log(req.body.hasOwnProperty('accNo'));
  Account.findOne({ accNo: req.body.accNo })
    .then(console.log('account found'))
    .catch(console.log('account not found'));
  return;
  Account.findOne({ accNo: req.body.accNo })
    .then((doc) => {
      if (doc) {
        // console.log(doc);
        return Beneficiary.create({
          initiatorUserId: req.mwAuthUserId,
          beneficiaryAccId: doc._id,
          name: req.body.name,
          contact: req.body.contact,
        });
      } else {
      }
    })
    .then((doc) => {
      console.log('Successful: postBeneficiary');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('postBeneficiary Error: ', err.message);
      res.status(400).send(err.message);
    });

  const verifiedAccNo = new Promise((resolve, reject) => {
    if (req.body.hasOwnProperty('accNo')) {
      //   verifyBankAcc(req.body.accNo).then(resolve).catch(reject);
    } else reject;
  });

  verifiedAccNo
    .then((doc) => {
      console.log('verified then: ', doc);
      return Beneficiary.findOneAndUpdate(
        {
          initiatorUserId: req.mwAuthUserId,
          _id: req.param.id,
        },
        req.body
      );
    })
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send('Update Beneficiary details failed: ', err.message);
    });

  return;

  Beneficiary.findOne({ initiatorUserId: req.mwAuthUserId, _id: req.param.id });

  return 'NEW CODE ABOVE THIS LINE';

  let updateParameter;
  if (req.body.hasOwnProperty('accNo')) {
    const beneficiaryAccId = await verifyBankAcc(req.body.accNo);
    delete req.body.accNo;
    updateParameter = { beneficiaryAccId, ...req.body };
  } else updateParameter = req.body;

  console.log(updateParameter);

  Beneficiary.findOneAndUpdate(
    { initiatorUserId: req.mwAuthUserId, _id: req.param.id },
    updateParameter
  )
    .then((doc) => {
      console.log(doc);
      console.log('Successful: putBeneficiary');
      return Beneficiary.findById(req.param.id);
    })
    .then((doc) => res.status(200).send(doc))
    .catch((err) => {
      console.log('putBeneficiary Error: ', err.message);
      res.status(400).send(err.message);
    });
};

module.exports = {
  postBeneficiaryController,
  deleteBeneficiaryController,
  getBeneficiaryController,
  putBeneficiaryController,
};
