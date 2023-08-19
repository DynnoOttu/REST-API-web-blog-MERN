const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const blogController = require("../controllers/blog");

// ==> POST : v1/blog/post
router.post(
  "/post",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title harus lebih dari 5 Huruf"),
    body("body")
      .isLength({ min: 5 })
      .withMessage("Body harus lebih dari 5 huruf"),
  ],
  blogController.createBlogPost
);

router.get("/posts", blogController.getAllBlogPost);
router.get("/post/:postId", blogController.getBlogPostById);

module.exports = router;
