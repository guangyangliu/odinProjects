const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const findToken = require('../utils/findtoken');
const authorization = require('../middleware/auth');

router.get('/', async(req,res) => {
const posts = await req.context.model.post.findMany(
    {include: {comments: {
        select: {
            id: true,
            content: true,
            user: {
                select: {
                    email: true
                }
            }

        }
    }}}
);
return res.json(posts);
})

router.get('/:postId',findToken, async(req,res) => {
    jwt.verify(req.token, 'secretKey', async(err, authData) => {
        if (err) {
            return res.status(403).json({message: 'Forbidden: Invalid token'});
        }
        const postId = parseInt(req.params.postId, 10);
        const post = await req.context.model.post.findUnique({
            where: {id: postId, authorId: authData.user.id}
        });
        if (!post) {
            return res.status(404).json({message: 'Post not found or you do not have permission to view this post'});
        };
        return res.status(200).json(post);
    })
    });


router.put('/:postId', findToken, async(req,res) => {
    jwt.verify(req.token, 'secretKey', async(err, authData) => {
    if (err) {
        return res.status(403).json({message: 'Forbidden: Invalid token'});
    }
    const postId = parseInt(req.params.postId, 10);
    const post = await req.context.model.post.update({
        where: {id: postId, authorId: authData.user.id},
        data: {
            title: req.body.title,
            content: req.body.content
        }
    });
    if (!post) {
        return res.status(404).json({message: 'Post not found or you do not have permission to update this post'});
    }
    return res.status(200).json({message: 'Post updated successfully', post});
    })
    
});

router.get('/user/:id', authorization, async(req,res) => {
    const authData = req.authData; // Get authData from the request
    const id = parseInt(req.params.id, 10);
    if(id !== authData.user.id) {
        return res.status(403).json({message: 'Forbidden: You can only access your own posts'});
    }
    const post = await req.context.model.post.findMany({
        where: {authorId: authData.user.id}
    });
    return res.json(post);
    }
);


router.post('/', findToken, async(req, res) => {
    // Verify JWT token
    jwt.verify(req.token, 'secretKey', async(err, authData) => {
        if (err) {
            return res.status(403).json({message: 'Forbidden: Invalid token'});
        } else {
            const post = await req.context.model.post.create({
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    authorId: authData.user.id
                }
            });
            return res.status(200).json({message: 'Post created!', authorId: authData.user.id});
        }
    })
    
})

module.exports = router;