const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.render("index");
});
app.post('/result', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    if (!name) {
        name = "person";
    }
    if (!age) {
        age = "0";
    }
    res.redirect(`/result?name=${name}&age=${age}`);
});
app.get('/result', (req, res) => {
    let name = req.query.name;
    let age = req.query.age;
    if (!name) {
        name = "person";
    }
    if (!age) {
        age = "0";
    }
    res.render("result", { name: name, age: age });
});
app.listen(3000);