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

    // GET users
    app.get('/api/user', (req, res) => {
        userService.query()
            .then(users => res.json(users));
    });

    // DELETE user
    app.delete('/api/user/:userId', (req, res) => {
        const { userId } = req.params;
        userService.remove(userId)
            .then(() => res.end())
            .catch(err => {
                res.end('Was not able to remove user');
            })
    })

    // GET single user
    app.get('/api/user/:userId', (req, res) => {
        // const userId = req.params.userId;
        const { userId } = req.params;

        userService.getById(userId)
            .then(user => res.json(user))
            .catch(err => {
                console.error('Problems:', err);
                res.status(500).send('User not Found');
            })
    })
}
