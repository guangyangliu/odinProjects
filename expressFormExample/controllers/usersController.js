// controllers/usersController.js
const asyncHandler = require("express-async-handler");
const usersStorage = require("../storages/usersStorage");

exports.usersListGet = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
});

exports.usersCreateGet = asyncHandler(async (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
});

exports.usersCreatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, age, bio } = req.body;
  usersStorage.addUser({ firstName, lastName, email, age, bio});
  res.redirect("/");
});

// This just shows the new stuff we're adding to the existing contents
const {body, validationResult} = require("express-validator");
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be formatted properly.";
const ageErr = "must be a number between 18 and 120.";
const bioErr = "maximum 200 characters.";

const validatorUser = [
    body("firstName").trim().isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({min: 1, max: 10}).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({min: 1, max: 10}).withMessage(`Last name ${lengthErr}`),
    body("email").trim()
        .isEmail().withMessage(`Email ${emailErr}`),
    body("age").optional().trim().custom(
            value => {
                if(value !== undefined && value<18 && value>120) {
                    throw new Error(ageErr);
                }
                return true;
            }
        ),
    body("bio").optional().trim()
        .isLength({max:200}).withMessage(`bio ${bioErr}`),
]

exports.usersCreatePost = [
    validatorUser,
    asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            });
        }
        const {firstName, lastName, email, age, bio} = req.body;
        usersStorage.addUser({firstName, lastName, email, age, bio});
        res.redirect("/");
    })
]

exports.usersUpdateGet = asyncHandler(async (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    res.render("updateUser", {
      title: "Update user",
      user: user,
    });
  });
  
  exports.usersUpdatePost = [
    validatorUser,
    asyncHandler(async (req, res) => {
      const user = usersStorage.getUser(req.params.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
          title: "Update user",
          user: user,
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
      res.redirect("/");
    })
  ];
  

  // Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = asyncHandler(async (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
  });
  


//search

const validatorName = [
    body("firstName").trim().isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({min: 1, max: 10}).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({min: 1, max: 10}).withMessage(`Last name ${lengthErr}`),
]

exports.usersSearchName = asyncHandler(async (req, res) => {
    res.render("searchName", {title: "Search User"});
})


exports.usersSearchGet = asyncHandler(async (req, res) => {
    const {firstName, lastName} = req.query;
        const users = usersStorage.getUsers();
        const user = users.find(user => user.firstName === firstName && user.lastName === lastName);
        res.render("search", {title: "Search User", user: user});
    
})


exports.usersSearchPost = [validatorName,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("searchName", {
                title: "Search User",
                errors: errors.array(),
            });
        }
        const {firstName, lastName} = req.body;
        const queryString = `?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
        res.redirect("/search"+queryString);
    })
]