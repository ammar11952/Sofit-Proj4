const Transaction = require('../db/transaction');

const postTransactionController = async (req, res) => {
  console.log('PostTransactionController');
  const postTransaction = Transaction.create({
    userId: req.mwAuthUserId,
    ...req.body,
  })
    .then((doc) => {
      console.log('Successful: postTransaction');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('postTransaction Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const deleteTransactionController = async (req, res) => {
  const deleteTransaction = Transaction.findOneAndDelete({
    userId: req.mwAuthUserId,
    ...req.body,
  })
    .then((doc) => {
      console.log('Successful: deleteTransaction');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('deleteTransaction Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const getTransactionController = async (req, res) => {
  const getTransaction = Transaction.find({ userId: req.mwAuthUserId })
    .then((doc) => {
      console.log('Successful: getTransaction');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('getTransaction Error: ', err.message);
      res.status(400).send(err.message);
    });
};
const putTransactionController = async (req, res) => {
  Transaction.findOneAndUpdate(
    { userId: req.mwAuthUserId, _id: req.param.id },
    req.body
  )
    .then((doc) => {
      console.log(doc);
      console.log('Successful: putTransaction');
      return Transaction.findById(req.param.id);
    })
    .then((doc) => res.status(200).send(doc))
    .catch((err) => {
      console.log('putTransaction Error: ', err.message);
      res.status(400).send(err.message);
    });
};

module.exports = {
  postTransactionController,
  deleteTransactionController,
  getTransactionController,
  putTransactionController,
};
