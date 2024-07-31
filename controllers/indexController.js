const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  const display = (req, res) => res.render("index", {title: "Mini Messageboard",messages: messages});
  const newMessage = (req,res) => res.render("form", {message: {text: "",user: "",}});
  const submit = (req, res) => {
    let messageText = req.body.message;
    let name = req.body.name;
    messages.push({text: messageText, user: name, added: new Date()});
    res.redirect("/")
  }
  const detail = (req, res) => {
    let index = req.params.index;
    let message = messages[index];
    if(message) {
        res.render("form", {message: message})
    } else {
        res.status(404).send('Message not found');
    }
  }
module.exports = {display, newMessage, submit, detail};

