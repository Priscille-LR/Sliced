const express = require("express");
const router = express.Router();
const { isLoggedIn, isCreator } = require("../middleware/route-guard");
const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");


router.get("/list", (req, res) => {
  const { query, dishType } = req.query;

  console.log(dishType);
  //if there's nothing in the recipe , render all the recipes,
  //otherwise render only those whose ingredients matcch the query
  if (query !== undefined && query !== "") {
    Recipe.find({
      ingredients: { $regex: new RegExp(query.toLowerCase(), "i") },
    }) //make query case insensitive
      .then((recipes) => {
        const loggedInNavigation = req.session.hasOwnProperty("currentUser");
        res.render("recipes/recipe-list", { recipes, loggedInNavigation });
      })
      .catch((err) => console.error(err));
  } else if (dishType !== undefined){
      Recipe.find({
        dishType: { $regex: new RegExp(dishType) },
      })
      .then((recipes) => {
        const errorMessage = recipes.length === 0 ? true : false
        const loggedInNavigation = req.session.hasOwnProperty("currentUser");
        if(errorMessage){
          res.render("recipes/recipe-list", { recipes, loggedInNavigation, errorMessage: 'Sorry, no recipes matching your search... Try again with something else?' });
        } else {
          res.render("recipes/recipe-list", { recipes, loggedInNavigation });  
        }
        
      })
      .catch((err) => console.error(err));
  } else {
    Recipe.find()
      .populate("creator")
      .then((recipes) => {
        const loggedInNavigation = req.session.hasOwnProperty("currentUser");
        res.render("recipes/recipe-list", { recipes, loggedInNavigation });
      })
      .catch((err) => console.error(err));
  }
});

router.get("/create", isLoggedIn, (req, res) => {
  const loggedInNavigation = true;
  res.render("recipes/add-recipe", { loggedInNavigation });
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
  const ingredientsArr = ingredients.split("\n");
  const instructionsArr = instructions.split("\n");
  Recipe.create({
    title,
    level,
    introduction,
    servings,
    duration,
    dishType,
    image,
    ingredients: ingredientsArr,
    instructions: instructionsArr,
    creator: _id,
  })
    .then((newRecipe) => {
      console.log(newRecipe);
      res.redirect("/recipes/list");
    })
    .catch((err) => console.error(err));
});


router.get('/id/:recipeId', (req, res) => {
  const _id = req.session?.currentUser?._id; // load property '_id' only if property 'currentUser' exists
  const { recipeId } = req.params;
  const favourites = req.session?.currentUser?.favouritesRecipes;
  Recipe.findOne({ _id: recipeId })
    .populate("creator")
    .populate({
      path: "reviews",
      populate: {
        path: "user", // populate property 'user' within property 'reviews'
        model: "User",
      },
    })
    .then((recipe) => {
      const loggedInNavigation = req.session.hasOwnProperty("currentUser");
      const isCreator = _id === recipe.creator._id.toString()
      const isFavourite = favourites !== undefined ? favourites.includes(recipeId) : false;
      const isAllowedToComment = !isCreator && req.session.hasOwnProperty('currentUser');
      res.render("recipes/recipe-details", {
        recipe,
        isFavourite,
        isCreator,
        loggedInNavigation,
        isAllowedToComment
      });
    })
    .catch((err) => console.error(err));
});

router.get("/edit/:recipeId", (req, res) => {
  const loggedInNavigation = true;
  const { recipeId } = req.params;
  Recipe.findOne({ _id: recipeId })
    .populate("creator")
    .then((recipe) => {
      res.render("recipes/edit-recipe", { recipe, loggedInNavigation });
    })
    .catch((err) => console.error(err));
});

router.post("/edit/:recipeId", isCreator, (req, res) => {
  const { recipeId } = req.params;
  //const recipeUpdateInfo = req.body;
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
  const ingredientsArr = ingredients.split("\n");
  const instructionsArr = instructions.split("\n");

  Recipe.findByIdAndUpdate(
    recipeId,
    {
      title,
      level,
      introduction,
      servings,
      duration,
      dishType,
      image,
      ingredients: ingredientsArr,
      instructions: instructionsArr,
    },
    { new: true }
  )
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


router.get('/favourites', (req, res) => {
  const favourites = req.session?.currentUser?.favouritesRecipes;

  Recipe.find({ _id : { $in : favourites } })
      .populate('creator')
      .then((recipes) => {
        const loggedInNavigation = req.session.hasOwnProperty('currentUser');
        res.render('recipes/recipe-list', { recipes, loggedInNavigation });
      })
      .catch((err) => console.error(err));
  }
)

router.post('/favourites/:recipeId', isLoggedIn, (req, res) => {
  const { recipeId } = req.params;
  const _id = req.session?.currentUser?._id;
  const favourites = req.session?.currentUser?.favouritesRecipes;
  const isFavorite = favourites.includes(recipeId);
  //check if the recipe is already in the favourites -
  //if it is not, push it to the favourites, if it is, render the same page with an error msg
  if (isFavorite) {
    favourites.splice(favourites.indexOf(recipeId), 1);
    User.findByIdAndUpdate(
      _id,
      { $pull: { favouritesRecipes: mongoose.Types.ObjectId(recipeId) } },
      { new: true }
    )
      .then(() => {
        res.redirect('/recipes/id/' + recipeId);
      })
      .catch((err) => console.error(err));
  } else {
    User.findByIdAndUpdate(
      _id,
      { $push: { favouritesRecipes: mongoose.Types.ObjectId(recipeId) } },
      { new: true }
    )
      .then(() => {
        favourites.push(recipeId);
        res.redirect('/recipes/id/' + recipeId);
      })
      .catch((err) => console.error(err));
  }
});



module.exports = router;
