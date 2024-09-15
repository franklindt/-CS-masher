const leetcodequery = require("leetcode-query").LeetCode;
const express = require('express');
const bodyParser = require('body-parser');

const leetcode = new leetcodequery();
const jsonParser = bodyParser.json();
const router = express.Router();
// const user = await leetcode.user("username");


router.get('/user-leetcode', jsonParser, async (req, res) => {
    try {
        await leetcode.user(req.body.username).then((e) => {
            e = [e.matchedUser.username, e.contributions.points, e.profile.ranking]
            res.status(200).send(e);
        })
    }
    catch(err) {
        console.log("hi" + err);
        res.status(404).send(">:3")
    }
})

module.exports=router