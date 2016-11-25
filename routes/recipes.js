var express = require('express');
var router = express.Router();
var Recipe = require("../modle/recipes");



router.route('/getRecipes').get(function(req,res) {
    Recipe.find(function(err, recipes) {
        if(err) {
            return res.send(err);
        }
    res.json(recipes);
    });
});

router.route('/createRecipes').post(function(req,res){
    var recipe = new Recipe(req.body);
    
    recipe.save(function(err){
        if(err) {
            return res.send(err);
        }
    res.send({message: 'Recipe Added'});
    });
});

router.route('/UpdateRecipes/:id').put(function(req,res){
    Recipe.FindOne({_id: req.params.id}, function(err,recipe){
        if(err) {
            return res.send(err);
        }
        for (prop in req.body) {
            recipe[prop] = req.body[prop];
        }
    
    recipe.save(function(err){
        if (err) {
            return res.send(err);
        }
        
        res.json({message:"Recipe updated"});
     });
    });
});

router.route('/retrieveRecipes/:id').get(function(req, res) {
    Recipe.findOne({_id: req.params.id}, function(err, recipe){
        if (err) {
            return res.send(err);
        }
        res.json(recipe);
    });
});

router.route("/DeleteRecipes/:id").delete(function(req,res){
    Recipe.remove({
        _id: req.params.id
    }, function(err, recipe) {
        if (err) {
            return res.send(err);
        }
        res.json({message: "Deletion Complete" });
    
    });
});

module.exports = router;