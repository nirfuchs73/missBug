const bugService = require('../services/bug.service');

// Add Bug Routes:
module.exports = app => {
    // REST API for BUGS

    // GET bug list
    app.get('/api/bug', (req, res) => {
        console.log('BACKEND user from session:', req.session.loggedInUser);
        const filterBy = req.query;
        console.log('FILTER BY', filterBy);
        bugService.query(filterBy)
            // bugService.query()
            .then(bugs => res.json(bugs))
    })
    // GET single bug
    app.get('/api/bug/:bugId', (req, res) => {
        // const bugId = req.params.bugId;
        const { bugId } = req.params;

        bugService.getById(bugId)
            .then(bug => res.json(bug))
            .catch(err => {
                console.error('Problems:', err);
                res.status(500).send('Bug not Found');
            })
    })
    // DELETE single bug
    app.delete('/api/bug/:bugId', (req, res) => {
        const { bugId } = req.params;
        // Same as:
        // const bugId = req.params.bugId;
        // const { loggedInUser } = req.session.loggedInUser;
        // console.log(req.session.loggedInUser);
        var loggedInUser = req.session.loggedInUser;
        bugService.getById(bugId)
            .then(bug => {
                console.log(loggedInUser.isAdmin, bug.creator.name, loggedInUser.userName);
                if (loggedInUser.isAdmin || bug.creator.name === loggedInUser.userName) {
                    console.log('delete bug');

                    bugService.remove(bugId)
                        .then(() => res.end())
                        .catch(err => {
                            res.end('No Possible');
                        })
                } else {
                    return res.end('User can delete only its own bugs');
                }
            })
    })
    // POST (ADD single bug)
    app.post('/api/bug', (req, res) => {
        const bug = req.body;
        var user = req.session.loggedInUser;
        // console.log(user);
        bugService.add(bug, user)
            .then((addedBug) => res.json(addedBug))
            .catch(err => {
                res.end('No Possible');
            })
    })

    // PUT (UPDATE single bug)
    app.put('/api/bug/:bugId', (req, res) => {
        var loggedInUser = req.session.loggedInUser;
        const bug = req.body;
        if (loggedInUser.isAdmin || bug.creator.name === loggedInUser.userName) {
            bugService.update(bug)
                .then((updatedBug) => res.json(updatedBug))
                .catch(err => {
                    res.end('No Possible');
                });
        } else {
            return res.end('User can edit only its own bugs');
        }
    })
};