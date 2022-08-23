const express = require('express');
const router = express.Router();

const { isLoggedIn, isOwner } = require('../middleware/route-guard');

const Recipe = require('../models/Recipe.model');

router.get('/edit/:id', (req, res) => {
  //const loggedInNavigation = true;
  res.render('recipes/edit-recipe');
});

router.post('/edit/:id', isOwner, (req, res) => {
  const { id } = req.params;
  const recipeUpdateInfo = req.body;

    Recipe.findByIdAndUpdate(id, recipeUpdateInfo, { new: true })
      .then(() => {
        res.redirect('/recipes/list');
      })
      .catch((err) => console.error(err));
  }
);

router.post('/delete/:id', isOwner, (req, res) => {
  const { id } = req.params;
  Recipe.findByIdAndDelete(id)
    .then(() => res.redirect('/recipes/list'))
    .catch((err) => console.error(err));
});

module.exports = router;
