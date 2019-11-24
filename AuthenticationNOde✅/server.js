const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10) //10 is the default hashing value
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
        res.status(201).send()
    } catch {

    }
});

app.post("/users/login", async(req, res) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null) {
        return res.status(400).send('Can not find user')
    }
    try {
        //used bcrypt compare here for security reasons and to prevent from attacks
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not allowed')
        }
    } catch {
        res.status(501).send()
    }
});

app.listen(3000);