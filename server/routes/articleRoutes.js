const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.homepage);
router.get('/article/:id', articleController.exploreArticle );
router.get('/categories', articleController.exploreCategories);
router.get('/categories/:id', articleController.exploreCategoriesById);
router.get('/submit-article', articleController.submitArticle);
router.post('/submit-article', articleController.submitArticleOnPost);
router.post('/articles/:id', articleController.deleteArticle);
router.get('/submit-category', articleController.submitCategory);
router.post('/submit-category', articleController.submitCategoryOnPost);

// edit - NEEDS WORK..
router.get('/views/edit/:id', articleController.getEditArticle);
// router.put('/articles/:id', articleController.updateArticle);


 
module.exports = router;