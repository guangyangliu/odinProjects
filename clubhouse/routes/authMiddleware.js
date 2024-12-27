exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

exports.isMember = (req, res, next) => {
    if (req.isAuthenticated() && req.user.membership) {
       return next();
    }
    res.redirect('/join');
}


exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
       return next();
    }
    res.redirect('/join');
}