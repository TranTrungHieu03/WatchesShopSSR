const MemberService = require("../services/memberService");
const bcrypt = require('bcrypt');
const { Token } = require("../utils/token");
const { Member } = require("../model");
const passport = require("passport");
const { User } = require("lucide");
const { isAdmin } = require("../middleware/authMiddleware");
const saltRounds = 10;

class AuthController {

    async signUp(req, res) {
        try {
            const { membername, password, confirmPassword, YOB, name } = req.body
            console.log(req.body);

            const errors = []
            if (!membername || !password || !confirmPassword || !name || !YOB) {
                errors.push({ message: "Please enter all fields" })
            }
            if (password !== confirmPassword) {
                errors.push({ message: "Password must be matched with confirm password" })

            }
            console.log(errors);

            if (errors.length > 0) {
                return res.status(400).render("auth/signup", {
                    errors,
                    membername, password, confirmPassword, YOB, name
                })
            }
            const user = MemberService.getOneByMemberName(membername)
            if (!user) {
                errors.push({ message: "Member name already exists" })
                return res.status(400).render("auth/signup", {
                    errors,
                    membername, password, confirmPassword, YOB, name
                })
            }
            // const hashPassword = bcrypt.hashSync(password, saltRounds);
            // const newUser = new Member({ memberName, password: hashPassword, YOB, name })


            await MemberService.createMember(membername, password, YOB, name)

            return res.status(201).redirect("/auth/login")
        } catch (error) {
            console.error("Error Sign up:", error);
            return res.status(500).render("error");
        }
    }

    async login(req, res, next) {

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                if (user.isAdmin) {
                    return res.redirect("/watch/dashboard")
                } else {
                    return res.redirect("/watch")
                }
            });
        })(req, res, next);
    }

    async loginWithGoogle(req, res) {

    }


    async refreshToken(req, res) {

    }
    async indexSignup(req, res) {
        try {
            console.log("Signup GET request received");
            return res.status(200).render("./auth/signup")
        } catch (error) {
            console.error("Error signup:", error);
            return res.status(500).render("error");
        }

    }
    async indexLogin(req, res) {
        try {
            console.log("Login GET request received");
            return res.status(200).render("./auth/login")
        } catch (error) {
            console.error("Error login:", error);
            return res.status(500).render("error");
        }
    }
    async logout(req, res) {
        req.logout((err) => {
            if (err) {
                return next(err);
            }

            return res.redirect("/watch");
        });
    }

}

module.exports = new AuthController