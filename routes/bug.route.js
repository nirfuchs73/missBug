const bugService = require('../services/bug.service');

// Add Bug Routes:
module.exports = app => {
    // REST API for BUGS

    // GET bug list
    app.get('/api/bug', (req, res) => {
        bugService.query()
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
        bugService.remove(bugId)
            .then(() => res.end())
            .catch(err => {
                res.end('No Possible');
            })
    })
    // POST (ADD single bug)
    app.post('/api/bug', (req, res) => {
        const bug = req.body;
        bugService.add(bug, req.session.userName)
            .then((addedBug) => res.json(addedBug))
            .catch(err => {
                res.end('No Possible');
            })
    })

    // PUT (UPDATE single bug)
    app.put('/api/bug/:bugId', (req, res) => {
        const bug = req.body;
        bugService.update(bug)
            .then((updatedBug) => res.json(updatedBug))
            .catch(err => {
                res.end('No Possible');
            })
    })
};