const mongoose = require('mongoose');
mongoose
  .connect(process.env.ATLAS_URI, {
    serverSelectionTimeoutMS: 2000,
  })
  .then((con) => console.log('connected to MongoDB'))
  .catch((err) => console.log(err.message));
