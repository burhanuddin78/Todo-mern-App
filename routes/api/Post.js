const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');



//@route  Todo api/todo
// @desc  Create a Todo
// @acess Private

router.post(
    '/',
    auth,
   
    [check('description', 'description is required').not().isEmpty()],

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            user: req.user.id,
            description: req.body.description,
         
        });
        const post = await newPost.save();
        res.json(post);
      } catch (error) {
        console.error(error.message);
        res.status(400).json({ msg: 'Server Error' });
      }
    }
  );

  //@route  Todo api/todo
// @desc  get all todo
// @acess Private

    router.get('/me/:id', auth,  async(req, res)=>{

        try {
            const todo = await Post.find({user:req.params.id});
            if(!todo){
                return res.status(404).json({msg:'Todo Not Found'})

           }
           res.json(todo)
        } catch (error) {
            console.error(error.message);
            if (error.kind == 'ObjectId') {
              return res.status(400).json({ msg: 'User Not found' });
            }
            res.status(400).json({ msg: 'Server Error' });
        }
    })

    //@route  Todo api/todo/:id
// @desc  delete todo
// @acess Private
    router.delete('/:id', auth, async (req, res) => {
        try {
          const todo = await Post.findById(req.params.id);
      
          if (todo.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'User is Not Authorized' });
          }
          if (!todo) {
            return res.status(400).json({ msg: 'todo not found' });
          }
      
          await todo.remove();
          res.json(todo);
        } catch (error) {
          console.error(error.message);
          if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'todo Not found' });
          }
          res.status(500).send('Server Error');
        }
      });


      router.put('/complete/:id', auth, async (req, res) => {
        const todocomplete = await Post.findById(req.params.id);
      
        if (todocomplete) {
          (todocomplete.complete = true),
           
          await todocomplete.save();
        }
        res.send({ message: 'Todo Complete.', todo: todocomplete });
      });

   




  
  module.exports = router;


