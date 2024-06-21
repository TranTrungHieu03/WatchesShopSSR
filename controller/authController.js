const MemberService = require("../services/memberService");
const passport = require("passport");
const memberService = require("../services/memberService");

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


            await MemberService.createMember(membername, password, YOB, name)

            return res.status(201).redirect("/login")
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
                    req.flash('success', "Login Success")
                    console.log(req.flash());
                    return res.redirect("/watch/dashboard")
                } else {
                    req.flash('success', "Login Success")
                    console.log(req.flash());
                    return res.redirect("/watch")
                }
            });
        })(req, res, next);
    }

    async loginWithGoogle(req, res) {

    }


    async confirmPass(req, res) {
        try {
            const user = await memberService.getMemberById(req.params.userId);

            const isMatch = await user.matchPassword(req.body.password)
            if (!isMatch) {
                return res.status(400)
            }

            return res.redirect(`/member/${req.params.userId}/change-pass`)
        } catch (error) {
            console.error("Error confirm pass:", error);
            return res.status(500).render("error");
        }
    }

    async changePass(req, res) {
        try {
            const { password, confirmPassword } = req.body;
            const { userId } = req.params;


            if (confirmPassword !== password) {
                return res.status(400)
            }
            if (!userId) {
                return res.status(400)
            }
            const user = await memberService.getMemberById(userId)

            user.password = password;
            await user.save();

            if (req.user.isAdmin) {
                return res.status(200).render("adminLayout", {
                    body: "./member/update",
                    user: user,
                    title: "Account Update"
                })
            } else {
                return res.status(200).render("layout", {
                    body: "./member/update",
                    user: user,
                    title: "Account Update"
                })
            }

        } catch (error) {
            console.error("Error change pass:", error);
            return res.status(500).render("error");
        }
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