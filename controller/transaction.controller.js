const Transaction = require('../db/transaction');
const Account = require('../db/account');

const postTransactionController = async (req, res) => {
  //   console.log('PostTransactionController');
  senderBalance = await Account.findOne({ _id: req.body.senderAccId })
    .then((doc) => {
      return doc.balance;
    })
    .catch((err) => {
      //   console.log('getAccount Error: ', err.message);
      res.status(400).send('Fetch Account Details Error :', err.message);
      return null;
    });
  if (senderBalance >= req.body.amount) {
    const postTransaction = Transaction.create(req.body)
      .then((doc) => {
        console.log('Successful: postTransaction');
        senderBalance -= req.body.amount;
        return Account.findOneAndUpdate(
          { _id: req.body.senderAccId },
          { balance: senderBalance }
        );
      })
      .then((doc) => {
        res.status(200).send('Transaction Successful: Balance Updated');
      })
      .catch((err) => {
        console.log('postTransaction Error: ', err.message);
        res
          .status(400)
          .send(
            'UNUPDATED BALANCE AFTER TRANSACTION: PLEASE REVIEW',
            err.message
          );
      });
  } else res.status(400).send('Insufficuent Balance in sender Account!');
};

const getTransactionController = async (req, res) => {
  const getTransaction = Transaction.find({ senderAccId: req.mwAuthUserId })
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
