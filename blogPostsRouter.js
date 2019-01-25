const express = require('express');
const router = express.Router();
const {BlogPosts} = require("./models");

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

BlogPosts.create(
    "Lorem Ipsum", 
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
    "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
    "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
    "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Adam Duggan"
)
BlogPosts.create(
    "Lorem Ipsum 2", 
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
    "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
    "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
    "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Maria Duggan"
)

//send back representation of all BlogPosts
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
  });
  
//post endpoint for adding new blogs 
router.post('/', jsonParser, (req, res) => {
    const requiredInput = ['title', 'content', 'author'];
    for(let i = 0; i < requiredInput.length; i++) {
        const currentInput = requiredInput[i];
        if(!(currentInput in req.body)){
            console.log("Not a current blog entry");
            res.status(400).send("Not a current blog entry");
        }
        
    }
    const newPost = BlogPosts.create(
        req.body.title,
        req.body.content,
        req.body.author
        )
    res.status(201).json(newPost);
});

//PUT endpoint to update an exisitng blogpost 
router.put('/:id', jsonParser, (req, res) => {
    const requiredInput = ['title', 'content', 'author'];
    for (let i = 0; i < requiredInput.length; i++){
        const field = requiredInput[i];
        if (! (field in req.body) ) {
            console.log("Not a current blog entry");
            res.status(400).send("Not a current blog entry");
        }
        if (req.params.id !== req.body.id){
            console.log("Sorry your query param is not the same as your body content");
            res.status(400).send("Sorry your query param is not the same as your body content");
        }
    }
    console.log("Updating BlogPost with your entry");
    BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).end();
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log("deleted");
    res.status(204).end();
});


module.exports = router;


