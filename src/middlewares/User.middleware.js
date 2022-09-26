const testEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  const emailValid = regex.test(email);
  return emailValid;
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!testEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  return next();
};

const validateUserFields = (req, res, next) => {
  const { displayName, password } = req.body;

  if (!displayName || displayName.length < 8) {
 return res.status(400).json({
    message: '"displayName" length must be at least 8 characters long', 
  }); 
}
  if (password.length < 6) {
 return res.status(400).json({
    message: '"password" length must be at least 6 characters long',
  }); 
}
return next();
};

module.exports = { validateUserFields, validateEmail };