const userModel = require('../../models/userModel.js');

exports.register = async (req, res, next) => {
  console.log('register: ', req.body);
  try {
    const user = await userModel.create({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    console.log('register - user: ', user);
    res.status(201).send({
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log('register - error: ', error);
    res.status(400).send({ message: error.message });
  }
  next();
};
