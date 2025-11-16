const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const problemCreate = require("../controllers/userProblem");
const problemRouter = express.Router();

problemRouter.post("/create", adminMiddleware,  problemCreate);
// problemRouter.patch("/:id", adminMiddleware, problemUpdate);
// problemRouter.delete("/:id", adminMiddleware, problemDelete);

// problemRouter.get("/:id", problemFetch);
// problemRouter.get("/", problemAllFetch);
// problemRouter.get("/user", solveProblem);

module.exports = problemRouter;