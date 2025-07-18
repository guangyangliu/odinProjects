const {Router} = require('express');
const router = Router();
const authorization = require('../middleware/auth');

router.get('/', async (req, res) => {
    const comments = await req.context.model.comment.findMany();
    return res.status(200).json(comments);
});

router.post('/:postId',authorization, async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const {commentContent} = req.body;
    const userId = req.authData.user.id;

    console.log(postId, commentContent, userId);

    if (!postId || !commentContent) {
        return res.status(400).json({message: 'Post ID and Comment are required'});
    }

    const comment = await req.context.model.comment.create({
        data: {
            content: commentContent,
            postId,
            userId
        }
    });
    return res.status(201).json({message: 'Comment created successfully', comment});
});

router.delete('/:commentId', authorization, async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const userId = req.authData.user.id;

    const comment = await req.context.model.comment.findUnique({
        where: {id: commentId}
    });

    if (!comment) {
        return res.status(404).json({message: 'Comment not found'});
    }

    if (comment.userId !== userId) {
        return res.status(403).json({message: 'Forbidden: You can only delete your own comments'});
    }

    await req.context.model.comment.delete({
        where: {id: commentId}
    });

    return res.status(200).json({message: 'Comment deleted successfully'});
});

module.exports = router;