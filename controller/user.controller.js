const User = require('../db/user');

const postUserController = async (req, res) => {
  const postUser = User.create(req.body)
    .then((doc) => {
      console.log('Successful: postUser');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('postUser Error: ', err.message);
      res.status(400).send(err.message);
      //return err.message;
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
  User.findOneAndUpdate({ _id: req.params.id }, req.body /*{ $set: req.body }*/)
    .then((doc) => {
      console.log('Successful: putUser');
      res.status(200).send(doc);
    })
    .catch((err) => {
      console.log('putUser Error: ', err.message);
      res.status(400).send(err.message);
    });

  // (req, res) => {
  //   let result = await product.updateOne(

  //   );

  //   res.send(result);
  // }
};

app.put('/update/:id', async (req, res) => {
  let result = await product.updateOne(
    { _id: req.params.id },

    {
      $set: req.body,
    }
  );

  res.send(result);
});

module.exports = {
  postUserController,
  deleteUserController,
  getUserController,
  putUserController,
};
