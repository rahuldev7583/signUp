const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/b08f9a8a3f";
  const options = {
    method: "POST",
    auth: "rahul:0ca63812b282c47519c4777d585b07f0-us9",
  };
  const request = https.request(url, options, (response) => {
    response.on("data", (data) => {
      //console.log(JSON.parse(data));
    }); 
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }   
    console.log(response.statusCode);
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
//API key
//0ca63812b282c47519c4777d585b07f0-us9
//list id
//b08f9a8a3f
