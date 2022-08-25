# Sliced
## Clean Recipes
<br>

## Description
Recipe sharing platform - more on the healthy / vegan side though ;)
<br>

## User stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **login-signup** - As a user I want to see a welcome page that gives me the option to either log in as an existing user, or sign up with a new account. 
- **add-signup** - As a user I want to sign up with my full information (username, email and password).
- **homepage** - As a user I want to see an invitation to either signup or login to be able to share my recipes.
- **recipe-list** - As a user I want to see the list of recipes results with for each recipe a card containing the image, the title, and a few details.
- **recipe details** - As a user I want to see more information about the game when I click on a certain item: the recipe title, a short description, the servings, duration, type of dish and obviously the ingredients and directions. 
- **favourites** - As a user I want to be able to add a recipe to my favourite recipes and access them easily.
<br>

## API routes (back-end)

### Auth routes

- GET /auth/signup
  - renders signup.hbs
- POST /auth/signup
  - body:
    - email
    - username
    - password
- GET /auth/login
  - renders renders login.hbs
- POST /auth/login
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)


### Recipes routes

- GET /list
  - renders recipe-list.hbs with filters if there are any
- GET /create
  - renders add-recipe.hbs
- POST /create
  - body: 
    - title,
    - level,
    - introduction,
    - servings,
    - duration,
    - dishType,
    - image,
    - ingredients,
    - instructions
- GET /id/:recipeId
  - renders recipe-details.hbs
  - includes the details of a particular recipe
- GET /edit/:recipeId
  - renders edit-recipe.hbs
  - renders an edit form
- POST /edit/:recipeId
  - body: 
    - title,
    - level,
    - introduction,
    - servings,
    - duration,
    - dishType,
    - image,
    - ingredients,
    - instructions
  - redirects on recipe list page if success
- POST /delete/:recipeId
    - redirects on recipe list page if success
- GET /favourites
  - renders recipe-list.hbs updated with the user's favourite recipes
- POST /favourites/:recipeId
  - push the recipe to the user's favourite recipes 
  - redirects to /recipes/id/ + recipeID 
  - user sees the same page, but with the heart button clicked


### Reviews routes

- POST /create
  - body: 
    - user
    - comment
  - redirects to /recipes/id/ + recipeID 
  - user sees the same page, with the added comment
<br>

## Models
 
 - User 
    new Schema ({
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
		})
          
  - Recipe 
    new Schema ({
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
    })
    
  - Review 
		new Schema ({
			 user: { type: Schema.Types.ObjectId, ref: "User" },
       comment: { type: String, maxLength: 200 },
    })
    
    <br>
    
## Backlog => to implement

 - Recipe-details.hbs
    - Fetch the nutritional values for each recipe from an API
    - Display the calories and the macros (amount of protein, fat & carbs) using a pie chart
    - Display the rating for a recipe (probably star rating)
 - Success
    - Modal to show the user that the recipe has been created successfully
    - Modal to show the user that the recipe has been updtated successfully
   
 - Signup 
    - Confirm the subscription to the user by sending them an email 
    
<br>


### Git
[Repository Link](https://github.com/Priscille-LR/project-2)

[Deploy Link](https://sliced-clean-recipes.herokuapp.com/recipes/list)

<br>

### Slides
[Google Slides Link](https://docs.google.com/presentation/d/1wxbeCvN9H6YmQqV0kc-sOdJ6e8VbicZcpHUurjqeBF8/edit#slide=id.p)
