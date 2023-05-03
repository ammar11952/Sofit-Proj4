const User = require('../db/user');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign(
    { id },
    'Is this a secret signature, now that it is in a public repo',
    { expiresIn: 36000 }
  );
};

const postUserController = async (req, res) => {
  const postUser = User.create(req.body)
    .then((doc) => {
      console.log('Successful: postUser');
      const token = createToken(doc._id);
      res.status(200).set('Auth', `Bearer ${token}`).send({
        _id: doc._id,
        name: doc.name,
        email: doc.email,
      });
    })
    .catch((err) => {
      console.log('postUser Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const deleteUserController = async (req, res) => {
  const deleteUser = User.findOneAndDelete(req.body)
    .then((doc) => {
      console.log('Successful: deleteUser');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('deleteUser Error: ', err.message);
      res.status(400).send(err.message);
    });
};

const getUserController = async (req, res) => {
  const getUser = User.find(req.body)
    .then((doc) => {
      console.log('Successful: getUser');
      res.status(200).send(
        doc.map((elem) => {
          return {
            _id: elem._id,
            name: elem.name,
            email: elem.email,
          };
        })
      );
    })
    .catch((err) => {
      console.log('getUser Error: ', err.message);
      res.status(400).send(err.message);
    });
};
const putUserController = async (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then((doc) => {
      console.log('Successful: putUser');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('putUser Error: ', err.message);
      res.status(400).send(err.message);
    });
};
const loginUserController = async (req, res) => {
  User.login(req.body)
    .then((doc) => {
      console.log('Successful: loginUser');
      const token = createToken(doc._id);
      res.status(200).set('Auth', `Bearer ${token}`).send({
        _id: doc._id,
        name: doc.name,
        email: doc.email,
      });
    })
    .catch((err) => {
      console.log('loginUser Error: ', err.message);
    });
};

module.exports = {
  postUserController,
  deleteUserController,
  getUserController,
  putUserController,
  loginUserController,
};
