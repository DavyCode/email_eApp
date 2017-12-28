const   passport = require('passport');

module.exports = (app) => {
    //=====
    //HOME ROUTE
    app.get('/', (req, res) => {
        res.render('home');
    });


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
        passport.authenticate('google')
    );

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })


    // ========
// Local Auth Routes
// ====================
    

    app.get('/auth/register', (req, res) => {
        res.render('user/register');
    });

    //handle signup logic
    app.post('/auth/register', (req, res) => {
        var newUser = new User({ username: req.body.username });
        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                return res.render('user/register');
            }
            passport.authenticate('local')(req, res, (user) => {
                res.redirect('/');
            });
        });
    });


    //show login form
    app.get('/auth/login', (req, res) => {
        res.render('user/login');
    });

    //handle login logic
    app.post('/auth/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    }), (req, res) => {});


    //Logout route
    app.get('/auth/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
}