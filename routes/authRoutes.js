const   passport = require('passport');

module.exports = (app) => {
    //=====
    //HOME ROUTE
    // app.get('/', (req, res) => {
    //     res.send("server home")
    //     // res.render('home');
    // });
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })


       // ========
// Google Auth Routes
// ====================
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope :['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', 
        { 
            failureRedirect: '/auth/login' 
        }),(req, res) => {
          // Successful authentication, redirect home.
          res.redirect('/surveys');
        }
    );

    // ========
// Facebook Oauth Routes
// ====================================== 
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook',
        {
            scope : ['public_profile', 'email','user_location','user_about_me']
        })
    );

    app.get(
        '/auth/facebook/callback', 
        passport.authenticate('facebook',
        {
              failureRedirect: '/auth/login' 
        }),(req, res) => {
            res.redirect('/surveys');
        }
    );



    // ========
// Local Auth Routes
// ==========================================
    app.get('/auth/register', (req, res) => {
        res.send("server register")
        // res.render('user/register');
    });

    //handle signup logic
    app.post('/auth/register', (req, res) => {
        var newUser = new User({ username: req.body.username });
        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                return  res.send("server register");
            }
            passport.authenticate('local')(req, res, (user) => {
                res.redirect('/');
            });
        });
    });


    //show login form
    app.get('/auth/login', (req, res) => {
        res.send("server login")
    });

    //handle login logic
    app.post('/auth/login', 
        passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }), (req, res) => {});


    //Logout route
    app.get('/api/logout', 
        (req, res) => {
            req.logout();
            res.redirect('/');
        }
    )



}