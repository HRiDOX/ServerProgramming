
  const ensureAuthenticated = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
     
      return res.redirect('/login');
    };
     function forwardAuthenticated(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      return res.redirect('/dashboard');      
    }

    module.exports = {ensureAuthenticated,forwardAuthenticated}

  