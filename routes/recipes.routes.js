const express = require("express");
const router = express.Router();
const { isLoggedIn, isCreator } = require("../middleware/route-guard");

const Recipe = require("../models/Recipe.model");

router.get("/list", (req, res) => {
  Recipe.find()
    .populate("creator")
    .then((recipes) => {
      const loggedInNavigation = req.session.hasOwnProperty("currentUser");
      res.render("recipes/recipe-list", { recipes, loggedInNavigation });
    })
    .catch((err) => console.error(err));
});

router.get("/create",isLoggedIn, (req, res) => {
  const loggedInNavigation = true;
  res.render("recipes/add-recipe", {loggedInNavigation});
});

router.post("/create", isLoggedIn, (req, res) => {
  const {
    title,
    level,
    introduction,
    servings,
    duration,
    dishType,
    image,
    ingredients,
    instructions,
  } = req.body;
  const { _id } = req.session.currentUser;
  console.log("user id", _id);
  Recipe.create({
    title,
    level,
    introduction,
    servings,
    duration,
    dishType,
    image,
    ingredients,
    instructions,
    creator: _id,
  })
    .then((newRecipe) => {
      res.redirect("/recipes/list");
    })
    .catch((err) => console.error(err));
});

router.get("/:recipeId", (req, res) => {
  const  _id = req.session?.currentUser?._id; // load property '_id' only if property 'currentUser' exists
  const { recipeId } = req.params;
  Recipe.findOne({ _id: recipeId })
  .populate("creator")
//.populate({
//     path: "reviews",
//     populate: {
//       path: "user", // populate property 'user' within property 'reviews'
//       model: "User",
//     },
//   })
  .then((recipe) => {
    console.log(recipe)
  const loggedInNavigation = req.session.hasOwnProperty("currentUser"); 
   //console.log(_id)
   //console.log(recipe.creator)
  const isNotCreator = _id !== recipe.creator._id.toString() && req.session.hasOwnProperty("currentUser");
  res.render("recipes/recipe-details", {recipe, isNotCreator, loggedInNavigation})
  })
    .catch((err) => console.error(err));
});

// router.get("/:recipeId", (req, res) => {
//   const { recipeId } = req.params;

//   Recipe.findById(recipeId)
//     .then((foundRecipes) => res.render("recipes/recipe-details", foundRecipes))
//     .catch((error) => `Error while creating a new book: ${error}`);
// });

router.get('/edit/:recipeId', (req, res) => {
  const loggedInNavigation = true;
  const { recipeId } = req.params;
  Recipe.findOne({ _id: recipeId })
    .populate('creator')
    .then((recipe) => {
      res.render('recipes/edit-recipe', { recipe, loggedInNavigation });
    })
    .catch((err) => console.error(err));
});

router.post("/edit/:recipeId", isCreator, (req, res) => {
  const { recipeId } = req.params;
  const recipeUpdateInfo = req.body;

  Recipe.findByIdAndUpdate(recipeId, recipeUpdateInfo, { new: true })
    .then(() => {
      res.redirect("/recipes/list");
    })
    .catch((err) => console.error(err));
});

router.post("/delete/:recipeId", isCreator, (req, res) => {
  const { recipeId } = req.params;
  Recipe.findByIdAndDelete(recipeId)
    .then(() => res.redirect("/recipes/list"))
    .catch((err) => console.error(err));
});

module.exports = router;
