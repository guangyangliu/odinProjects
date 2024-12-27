const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const display = asyncHandler(async(req, res) => {
    const messages = await db.getAllMessages();
    res.render("index", {title: "Mini Messageboard",messages: messages})
  });

  const newMessage =  asyncHandler(async(req,res) => res.render("form", {message: {text: "",name: "",}}));
  
  const submit =  asyncHandler(async(req, res) => {
    let text = req.body.message;
    let name = req.body.name;
    await db.addMessage(text, name);
    res.redirect("/")
  });


  const detail = asyncHandler(async(req, res) => {
    let index = req.params.index;
    const messages = await db.getAllMessages();
    let message = messages[index];
    if(message) {
        res.render("form", {message: message})
    } else {
        res.status(404).send('Message not found');
    }
  });
module.exports = {display, newMessage, submit, detail};

