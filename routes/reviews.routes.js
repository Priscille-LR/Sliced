const router = require("express").Router();

const Review = require("../models/Review.model");
const Recipe = require("../models/Recipe.model");

router.post("/create/:recipeId", async (req, res) => {
  const { comment } = req.body;
  const { recipeId } = req.params;

  const recipe = await Recipe.findOne({ _id: recipeId }); // find recipe in DB

  Review.create({ user: req.session.currentUser._id, comment })
    .then(async (newReview) => {
      await recipe.reviews.push(newReview._id); // add review id to recipe 'reviews' property
      await recipe.save(); // save recipe with new review id to the DB
    })
    .then(() => res.redirect(`/recipes/id/${recipeId}`))
    .catch((err) => console.error(err));
});

module.exports = router;
