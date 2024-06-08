var express = require('express');
var router = express.Router();
const brandRouter = require("./brand")
const authRouter = require("./auth")
const watchRouter = require("./watch")


router.use("/auth", authRouter)
router.use("/brand", brandRouter)
router.use("/watch", watchRouter)
router.get("/home", (req, res) => {
    res.status(200).render("layout", {
        body: "index",
        title: "Home Page"
    })
})

module.exports = router;
