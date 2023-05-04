const Transaction = require('../db/transaction');
const Account = require('../db/account');
const { error } = require('console');

const postTransactionController = async (req, res) => {
  //   console.log('PostTransactionController');
  senderBalance = await Account.findOne({ _id: req.body.senderAccId })
    .then((doc) => {
      return doc.balance;
    })
    .catch((err) => {
      //   console.log('getAccount Error: ', err.message);
      res.status(404).send('Fetch Account Details Error :', err.message);
      return null;
    });

  if (senderBalance >= req.body.amount) {
    senderBalance -= req.body.amount;
    Account.findOneAndUpdate(
      { _id: req.body.senderAccId },
      { balance: senderBalance }
    )
      .then((doc) => {
        //balance updated transaction post pending
        Transaction.create({ status: 'Success', ...req.body })
          .then((doc) => res.status(200).send(doc))
          .catch((err) =>
            res
              .status(400)
              .send(
                'Please Review. Balance updated but transaction not added:',
                err.message
              )
          );
      })
      .catch((err) =>
        res
          .status(200)
          .send('Balance Update Failed: Transaction not created!', err.message)
      );
  } else res.status(400).send('Insufficuent Balance in sender Account!');
};

const getTransactionController = async (req, res) => {
  console.log('getTransactionController called!');
  const getTransaction = Transaction.find({
    senderAccId: req.body.senderAccId,
    receiverAccId: req.body.receiverAccId,
  })
    .then((doc) => {
      console.log('Successful: getTransaction');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('getTransaction Error: ', err.message);
      res.status(400).send(err.message);
    });
};

module.exports = {
  postTransactionController,
  getTransactionController,
};
