const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe.model");

router.get("/list", (req, res) => {
  Recipe.find()
    .populate("creator")
    .then((recipes) => {
      //const loggedInNavigation = req.session.hasOwnProperty("currentUser");
      res.render("recipes/recipe-list", { recipes });
    })
    .catch((err) => console.error(err));
});

router.get("/create", (req, res) => {
  //const loggedInNavigation = true;
  res.render("recipes/add-recipe");
});

router.post("/create", (req, res) => {
  const {
    title,
    level,
    introduction,
    servings,
    duration,
    dishType,
    imageUrl,
    ingrediants,
    instructions,
  } = req.body;
  //const { _id } = req.session.currentUser;
  //console.log("user id", _id);
  Recipe.create({
    title,
    level,
    introduction,
    servings,
    duration,
    dishType,
    imageUrl,
    ingrediants,
    instructions,
    //creator: _id,
  })
    .then((newRecipe) => {
      res.redirect("/recipes/list");
    })
    .catch((err) => console.error(err));
});

// router.get("/:recipeId", (req, res) => {
//   //const  _id = req.session?.currentUser?._id; // load property '_id' only if property 'currentUser' exists
//   const { recipeId } = req.params;
//   Recipe.findOne({ id: recipeId });
//   //.populate("creator reviews") // populate property 'owner' and 'reviews'
//   // .populate({
//   //   path: "reviews",
//   //   populate: {
//   //     path: "user", // populate property 'user' within property 'reviews'
//   //     model: "User",
//   //   },
//   // })
//   //.then((recipe) => {
//   //const loggedInNavigation = req.session.hasOwnProperty("currentUser"); // check if user is loggedIn by looking if this property exist on req.session
//   //   const isNotCreator =
//   //     _id !== recipe.creator._id.toString() &&
//   //     req.session.hasOwnProperty("currentUser");
//   res
//     .render("recipes/recipe-details", {
//       recipe,
//       // isNotOwner,
//       // loggedInNavigation,
//       //});
//     })
//     .catch((err) => console.error(err));
// });

router.get("/:recipeId", (req, res) => {
  const { recipeId } = req.params;

  Recipe.findById(recipeId)
    .then((foundRecipes) => res.render("recipes/recipe-details", foundRecipes))
    .catch((error) => `Error while creating a new book: ${error}`);
});

module.exports = router;
