const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  // console.log('Auth Called');
  let token;
  try {
    token = req.headers.auth.split(' ');
    if (!token || token[0] != 'Bearer' || !req.headers.auth) {
      console.log('Auth Failed: Invalid or no token found');
      throw Error('Auth Failed: Invalid or no token found');
    }

    jwt.verify(
      token[1],
      'Is this a secret signature, now that it is in a public repo',
      (err, decodedToken) => {
        if (!err) {
          req.mwAuthUserId = decodedToken.id;
          // console.log(req.mwAuthUserId);
          next();
        } else throw err;
      }
    );
  } catch (err) {
    if (!token || token[0] != 'Bearer') res.status(403).send(err.nessage);
    else res.status(498).send(err.message);
    return;
  }
  //   res.status(401).send(Error('Auth Failed: required key not found in Header'));
};

module.exports = requireAuth;
