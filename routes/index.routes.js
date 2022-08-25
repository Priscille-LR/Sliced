const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  const loggedInNavigation = req.session.hasOwnProperty('currentUser');
  res.render("index", { loggedInNavigation });
});

module.exports = router;
