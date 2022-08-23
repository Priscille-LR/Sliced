const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isCreator = (req, res, next) => {
  if(!req.session.currentUser._id === req.params.roomId){
   res.redirect('/')
  }
  next()
}


module.exports = {
  isLoggedIn,
  isLoggedOut,
  isCreator
};
