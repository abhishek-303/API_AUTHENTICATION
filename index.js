import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "abhi";
const yourPassword = "abhi@123";
const yourAPIKey = "ce5d9940-a92b-454e-bfe6-1209e80011a5";
const yourBearerToken = "520285b4-9ab7-4070-ba65-3b85cef90ed4";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint 
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey",async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try {
    const result = await axios.get(API_URL + "/filter", {
      params:{
        score: 5,
        apiKey: yourAPIKey,
      }
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch (error) {
    res.status(404).send(error.message)
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
 
  try {
    const result = await axios.get(API_URL + "/secrets/2", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      }

    });
  }
  catch (error) {
    res.status(404).send(error.message);
  }
});
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
