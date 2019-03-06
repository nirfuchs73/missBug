const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');


// const userService = require('./services/user.service')
const bugService = require('./services/bug.service');

const app = express()
const port = 3000

app.use(bodyParser.json());
// app.use(cookieParser());


// Express, please serve all static resource from the public folder
app.use(express.static('public'))

// REST API for BUGS

// GET list
app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => res.json(bugs))
})
// GET single
app.get('/api/bug/:bugId', (req, res) => {
    // const bugId = req.params.bugId;
    const {bugId} = req.params;

    bugService.getById(bugId)
        .then(bug => res.json(bug))
        .catch(err => {
            console.error('Problems:', err);
            res.status(500).send('Bug not Found');
        })
    
})
// DELETE single
app.delete('/api/bug/:bugId', (req, res) => {
    const {bugId} = req.params;
    bugService.remove(bugId)
        .then(() => res.end())
        .catch(err => {
            res.end('No Possible');
        })
})
// POST (ADD single)
app.post('/api/bug', (req, res) => {
    const bug = req.body;
    bugService.add(bug)
        .then((addedBug) => res.json(addedBug))
        .catch(err => {
            res.end('No Possible');
        })
})

// PUT (UPDATE single)
app.put('/api/bug/:bugId', (req, res) => {
    const bug = req.body;
    bugService.update(bug)
        .then((updatedBug) => res.json(updatedBug))
        .catch(err => {
            res.end('No Possible');
        })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))