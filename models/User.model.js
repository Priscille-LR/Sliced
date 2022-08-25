const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Full Name is required.'],
      trim: true,
    },
    favouritesRecipes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Recipe" }]
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
