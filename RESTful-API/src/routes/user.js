const {Router} = require('express');
const router = Router();
router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.users));
  });
  
  router.get('/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
  });
  
  module.exports= router;
