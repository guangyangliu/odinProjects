const {Router} = require('express');
const router = Router();

router.post('/', async (req, res) => {
    await req.context.model.user.create({data:{
        email: req.body.email,
        password: req.body.password // In a real application, ensure to hash the password before saving
    }});
    return res.send({message: "User created successfully"});
})

router.get('/', async (req, res) => {
    const users = await req.context.model.user.findMany();
    return res.send(users);
});

router.delete('/', async(req, res) => {
    await req.context.model.user.deleteMany();
    return res.send({message: "All users deleted"});
})

module.exports = router;