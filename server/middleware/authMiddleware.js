const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
};

const author = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else if (req.user.posts.includes(req.params.id)) {
    next();
  } else {
    res.status(401).json({message: 'Not authorized'})
  }
};


module.exports = { admin, author };
