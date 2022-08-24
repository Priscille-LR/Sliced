const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, uniqueItems: true },
    level: {
      type: String,
      enum: ["easy", "medium", "pro"],
    },
    servings: { type: Number, minimum: 1 },
    duration: { type: Number, minimum: 0 },
    introduction: { type: String },
    dishType: {
      type: String,
      enum: [
        "Breakfast",
        "Main Course",
        "Side",
        "Snack",
        "Drink",
        "Dessert",
        "Other",
      ],
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    ingredients: { type: [String] },
    instructions: { type: [String] },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    //rating: { type: Schema.Types.ObjectId, ref: "Review" },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
