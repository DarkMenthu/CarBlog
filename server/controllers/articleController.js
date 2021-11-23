require('../models/database');
const Category = require('../models/Category');
const Article = require('../models/Article');

// home
exports.homepage = async(req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Article.find({}).sort({_id: -1}).limit(limitNumber);
    const petrol = await Article.find({ 'category': 'Petrol' }).limit(limitNumber);
    const diesel = await Article.find({ 'category': 'Diesel' }).limit(limitNumber);
    const hybrid = await Article.find({ 'category': 'Hybrid' }).limit(limitNumber);

    const eng = { latest, petrol, diesel, hybrid };

    res.render('index', { title: 'Car Blog - Home', categories, eng } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}

// categories
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Car Blog - Categories', categories } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


// categories/:id
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 3;
    const categoryById = await Article.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Car Blog - Categories', categoryById } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 
 
exports.exploreArticle = async(req, res) => {
  try {
    let articleId = req.params.id;
    const article = await Article.findById(articleId);
    res.render('article', { title: 'Car blog', article } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 

exports.submitArticle = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-article', { title: 'Car blog - Submit Article', infoErrorsObj, infoSubmitObj  } );
}

exports.submitArticleOnPost = async(req, res) => {

    const newArticle = new Article({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      specs: req.body.specs,
      category: req.body.category
    });
    
    await newArticle.save();

    req.flash('infoSubmit', 'Article has been added.')
    res.redirect('/submit-article');
  }


exports.deleteArticle = async(req, res) => {
    try {
      let articleId = req.params.id;
      const article = await Article.findByIdAndDelete(articleId);
      res.redirect('/')
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
}

// edit - NEEDS WORK...
exports.getEditArticle = async(req, res) => {
  try {
    let articleId = req.params.id;
    const article = await Article.findById(articleId);
    res.render('/views/edit/', { title: 'Car blog', article } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}


exports.submitCategory = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-category', { title: 'Car blog - Submit Category', infoErrorsObj, infoSubmitObj  } );
}

exports.submitCategoryOnPost = async(req, res) => {

  const newCategory = new Category({
    name: req.body.name,
    description: req.body.description
  });
  
  await newCategory.save();

  req.flash('infoSubmit', 'Category has been created.')
  res.redirect('/submit-category');
}