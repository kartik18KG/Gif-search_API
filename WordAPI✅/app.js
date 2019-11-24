const express = require("express");
const app = express();
const fetch = require("node-fetch");
const api_key2 = "B6ZXEMZ5";

app.use(express.static("public"));

app.get("/gif", async(req, res) => {
    console.log("request recieved");

    const response = await fetch(
        `https://random-word-api.herokuapp.com/word?key=${api_key2}`
    );
    const data = await response.json();
    console.log(data);
    res.send(data);
});
app.listen(4000, () => {
    console.log("listening at 4000");
});