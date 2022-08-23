require("../db");

const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.model");

const recipes = [
  {
    title: "Passion Fruit & Kombucha Spritz",
    level: "Easy",
    servings: 2,
    duration: 10,
    introduction:
      "This drink is bursting with flavour. Passion fruit gives it a sweet taste and the seeds add a nice crunch. Kombucha is full of probiotics and adds a bit of a fizzy tingle. This refreshing drink is a little bit tart because of the grapefruit, but the combination with the herbs makes it a juicy, thirst-quenching drink.",
    dishType: "drink",
    image:
      "https://cdn.pickuplimes.com/cache/b1/73/b173fdb8c36f145e80dd47f3783c1c60.jpg",
    ingredients: [
      "4 grapefruits",
      "4 passion fruits",
      "¼ cup (8 g) fresh mint leaves",
      "2 Tbsp (3 g) fresh basil (optional)",
      "1 lime, sliced",
      "4 cups (444 g) ice cubes",
      "2 cups (480 mL) kombucha",
    ],
    instructions: [
      "Juice the grapefruits.",
      "Cut the passion fruits open and scoop the seeds out into each glass.",
      "Divide the mint leaves, basil leaves, and lime slices between the glasses and muddle everything together with a tamper.",
      "Add ice cubes and finish with equal parts of grapefruit juice and kombucha.",
      "Garnish as desired, and enjoy!",
    ],
  },

  {
    title: "Quick Pesto Couscous Salad",
    level: "Easy",
    servings: 3,
    duration: 10,
    introduction:
      "Easy, quick, and delicious: words that perfectly describe this couscous salad! It's also an incredibly versatile recipe, so adjust to your own taste by using red pesto, or bell pepper instead of cucumber, different herbs, or add some lemon juice. Anything goes!",
    dishType: "side",
    image:
      "https://cdn.pickuplimes.com/cache/cd/20/cd20bf264ba3e2911d6b76db11754b30.jpg",
    ingredients: [
      "1 cup (173 g) uncooked couscous",
      "½ vegetable bouillon cube, crushed",
      "1 cup (240 mL) boiling water",
      "1 cup (149 g) cherry tomatoes",
      "½ cucumber",
      "⅓ cup (50 g) kalamata olives",
      "3.1 oz (90 g) vegan feta",
      "3 Tbsp (4 g) fresh basil (optional)",
      "3 Tbsp (6 g) fresh mint leaves (optional)",
      "3 Tbsp (3 g) fresh parsley (optional)",
      "¾ cup (148 g) cooked brown lentils",
      "¼ cup (22 g) vegan green pesto",
    ],
    instructions: [
      "To a large bowl, add the couscous, crushed bouillon cube, and boiling water. Mix, cover with a plate and set aside.",
      "In the meantime, chop the veggies, olives and feta into bite-sized pieces, and finely chop the herbs.",
      "Coming back to the large bowl with couscous, remove the plate and use a fork to “fluff” the couscous.",
      "Add the veggies, feta, herbs, lentils and pesto to the bowl with couscous. Mix and enjoy!",
    ],
  },

  {
    title: "Leek and Spinach Tofu Quiche",
    level: "Medium",
    servings: 4,
    duration: 67,
    introduction:
      "When blended, the tofu creates the perfect consistency for this quiche and the turmeric creates a beautiful golden colour. This tofu quiche is hearty, filling and can be enjoyed hot or cold!",
    dishType: "main_course",
    image:
      "https://cdn.pickuplimes.com/cache/b1/eb/b1eb64b303c5b8905a083e4db3f04006.jpg",
    ingredients: [
      "2 medium leeks",
      "1 Tbsp (15 mL) vegetable oil ",
      "1 medium onion, chopped",
      "3 cloves garlic, minced",
      "½ tsp salt",
      "5 cups (150 g) fresh spinach, coarsely chopped",
      "½ vegetable bouillon cube, crushed (optional)",
      "1 tsp (1 g) dried thyme",
      "1 tsp (1 g) dried parsley",
      "½ tsp ground black pepper",
      "9.5 oz (270 g) vegan puff pastry dough",
      "1 Tbsp (7 g) breadcrumbs",
      "22.9 oz (650 g) firm tofu",
      "1¼ lemons, juiced",
      "¼ cup (9 g) nutritional yeast flakes",
      "1 Tbsp (8 g) cornstarch",
      "1 tsp (5 mL) Dijon mustard",
      "1 tsp (3 g) ground turmeric",
      "½ tsp kala namak",
      "1 cup (180 g) cherry tomatoes, halved",
    ],
    instructions: [
      "Prepare the leek by cutting off the root and the overly fibrous green top. This can be discarded or saved for homemade vegetable stock. Cut the leek in half, wash in between the layers, and then thinly slice.",
      "Place a large pan over high heat and add the oil. Once hot, add the leek, onion, garlic, and salt, and cook for about 7 minutes, or until there is no moisture in the pan and the leeks have softened.",
      "Next, add the spinach, crushed bouillon, thyme, parsley, and pepper and cook for about 2 minutes, until the spinach is wilted and no moisture remains in the pan*. Turn off the heat.",
      "Grease a 9½ inch (25 cm) round tart pan, and lay the puff pastry dough in the pan. Gently press the pastry down and up along the sides, just over 1 inch (3 cm) in height.",
      "Use a fork to poke holes in the bottom of the dough and sprinkle the breadcrumbs along the base. Then preheat the oven to 390°F (200°C).",
      "Ensure that the tofu is sufficiently drained and pressed. If the tofu is too wet, the inside of the quiche can become soggy. To a food processor add the tofu, lemon juice, nutritional yeast, cornstarch, mustard, turmeric, and kala namak. Blend until smooth.",
      "Add the blended tofu mixture to the vegetables in the pan and mix together.",
      "Transfer the mixture from the pan to the tart pan and spread it out evenly. Roll over any excess pastry dough around the rim to create a crust.",
      "Place the halved tomatoes on top, cut side up, and bake on the centre rack of the preheated oven for 35 - 40 minutes, or until the crust is slightly golden and the top is firm to the touch.",
      "Let the quiche cool off for at least 10 minutes before slicing. This time allows the quiche to firm up so it can be cut more cleanly. Enjoy!",
    ],
  },
];

Recipe.insertMany(recipes)
  .then((recipes) => {
    recipes.forEach((recipe) => console.log(recipe.title));
    mongoose.connection.close();
  })
  .catch((saveErr) => console.error(`Save failed: ${saveErr}`));
