//STEP 4 IS MAKING THE API ROUTES. THIS INTERACTS WITH THE CONTROLLER WHICH INTERACTS WITH THE DATABASE
const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router
  .route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
