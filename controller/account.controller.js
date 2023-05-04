const Account = require('../db/account');

const postAccountController = async (req, res) => {
  console.log('PostAccountController');
  const postAccount = Account.create({ userId: req.mwAuthUserId, ...req.body })
    .then((doc) => {
      console.log('Successful: postAccount');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('postAccount Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const deleteAccountController = async (req, res) => {
  const deleteAccount = Account.findOneAndDelete({
    userId: req.mwAuthUserId,
    ...req.body,
  })
    .then((doc) => {
      console.log('Successful: deleteAccount');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('deleteAccount Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const getAccountController = async (req, res) => {
  const getAccount = Account.find({ userId: req.mwAuthUserId })
    .then((doc) => {
      console.log('Successful: getAccount');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('getAccount Error: ', err.message);
      res.status(400).send(err.message);
    });
};
const putAccountController = async (req, res) => {
  Account.findOneAndUpdate(
    { userId: req.mwAuthUserId, _id: req.param.id },
    req.body
  )
    .then((doc) => {
      console.log(doc);
      console.log('Successful: putAccount');
      return Account.findById(req.param.id);
    })
    .then((doc) => res.status(200).send(doc))
    .catch((err) => {
      console.log('putAccount Error: ', err.message);
      res.status(400).send(err.message);
    });
};

module.exports = {
  postAccountController,
  deleteAccountController,
  getAccountController,
  putAccountController,
};
