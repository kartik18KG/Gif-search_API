const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.static("public"));
const fetch = require("node-fetch");
app.get("/", (req, res) => {
    res.render("../public/index");
});

app.get("/gif/:word", async(req, res) => {
    // const api_key = process.env.API_KEY;
    // console.log(api_key);
    console.log(process.env.API_KEY)
    console.log("request recieved");
    const word = req.params.word;
    console.log(word);

    const response = await fetch(
        `http://api.giphy.com/v1/gifs/search?q=${word}&api_key=415yWi6Yw6tdGytPhiSImbwGUVhAmDcH&limit=1`
    );

    // image.done(data=>{
    //   console.log("success got data", data);
    //  });
    const data = await response.json();
    console.log(data);
    res.json(data);
});

// const params = {
//     api_key: "415yWi6Yw6tdGytPhiSImbwGUVhAmDcH",
//     q: "Pizza",
//     limit: 5,
//     offset: 0,
//     rating: "g",
//     lang: "en",
//     random_id: "e826c9fc5c929e0d6c6d423841a282aa"
// };

// async function getGIF() {
//     const response = await fetch(GIFurl);
//     data = await response.json();
//     imageURL = await data.data[0].images.original.url;
//     console.log(imageURL);
// }
// getGIF();
//RANDOM WORD AND GIF ROUTE
const api_key2 = "B6ZXEMZ5";
app.get("/wordNgif", async(req, res) => {
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