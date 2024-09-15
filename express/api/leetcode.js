const leetcodequery = require("leetcode-query");
const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const router = express.Router();
// const user = await leetcode.user("username");


router.get('/user-leetcode', jsonParser, async (req, res) => {
    try {
        await leetcodequery.user(req.body.username).then((e) => {
            res.status(200).send(e);
        })
    }
    catch(err) {
        res.status(404).send(">:3")
    }
})