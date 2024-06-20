var express = require('express');
var router = express.Router();
const brandRouter = require("./brand")
const authRouter = require("./auth")
const watchRouter = require("./watch")
const memberRouter = require("./member")


router.use("/", authRouter)
router.use("/brand", brandRouter)

router.use("/watch", watchRouter)
router.use("/member", memberRouter)
router.use("/forbidden", (req, res) => { res.render("forbidden") })
// router.get("/home", (req, res) => {
//     res.status(200).render("layout", {
//         body: "index",
//         title: "Home Page"
//     })
// })

module.exports = router;
