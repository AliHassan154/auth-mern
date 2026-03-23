const express = require("express");
const ensureAuthenticated = require("../Middlewares/Auth");

const router = express.Router();

router.get('/products', ensureAuthenticated, (req, res)=>{
    res.status(200).json([
        {
            name:  "mobile",
            price: "20000"
        },
        {
            name:  "tv",
            price: "1000"
        }
    ])
});


module.exports = router;