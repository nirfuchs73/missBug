const userService = require('../services/user.service');

// Add User Routes:
module.exports = app => {

    // POST (ADD single user)
    app.post('/api/signup', (req, res) => {
        userService.checkSignup(req.body.userName)
            .then(() => {
                const user = req.body;
                console.log(user);
                userService.add(user)
                    .then((addedUser) => {
                        res.json(addedUser);
                        console.log('New user was added: ', addedUser);
                    })
                    .catch(err => {
                        console.log(err);
                        res.end('No Possible');
                    })
            })
            .catch(err => {
                console.log('/api/signup', err);
                res.status(400).send(err);
            })
    })

    // POST (login user)
    app.post('/api/login', (req, res) => {
        userService.checkLogin(req.body.userName, req.body.password)
            .then(user => {
                // console.log(user);
                req.session.loggedInUser = user;
                res.json(user);
                console.log('User logged in: ', user);
            })
            .catch(err => {
                // console.log('BACKEND service ERROR', err);
                res.status(400).send(err);
            });
    });

    // GET logout user
    app.get('/api/logout', (req, res) => {
        req.session.destroy();
        res.json({});
    });
}
