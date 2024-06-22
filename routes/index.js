var express = require('express');
var router = express.Router();
const brandRouter = require("./brand")
const authRouter = require("./auth")
const watchRouter = require("./watch")
const memberRouter = require("./member")
const commentRouter = require("./comment")


router.use("/", authRouter)
router.use((req, res, next) => {
    if (req.url === '/' && req.method === 'GET') {
        if (req.user.isAdmin) {
            res.redirect('/watch/dashboard');
        } else {
            res.redirect('/watch');
        }

    } else {
        next();
    }
});
router.use("/brand", brandRouter)

router.use("/watch", watchRouter)
router.use("/member", memberRouter)
router.use("/comment", commentRouter)
router.use("/forbidden", (req, res) => { res.render("forbidden") })


module.exports = router;
