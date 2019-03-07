const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const cors = require('cors');

const addUserRoutes = require("./routes/user.route");
const addBugRoutes = require("./routes/bug.route");

const app = express();
const port = 3000;

// app.use(cors())
// Express, please serve all static resource from the public folder
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

addUserRoutes(app);
addBugRoutes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))