const verifyAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    res.status(403).json();
  }
};

module.exports = verifyAdmin;
