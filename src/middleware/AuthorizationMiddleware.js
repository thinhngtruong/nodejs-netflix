function authorize() {
  return (req, res, next) => {
    const account = req.user;
    if (account.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        message: 'Cannot access the resources.',
      });
    }
  };
}

module.exports = {
  authorize,
};