const MemberService = require("../services/memberService");
const passport = require("passport");
const memberService = require("../services/memberService");

class AuthController {

    async signUp(req, res) {
        try {
            const { membername, password, confirmPassword, YOB, name } = req.body
            console.log(req.body);

            if (!membername || !password || !confirmPassword || !name || !YOB) {
                req.session.message = { type: "danger", message: "Please fill all field" }
                req.session.info = { membername, password, confirmPassword, YOB, name }
                return res.redirect("/signup")
                // return res.render("auth/signup", {
                //     membername, password, confirmPassword, YOB, name
                // })
            }
            if (password !== confirmPassword) {
                req.session.message = { type: "danger", message: "Password must be matched with confirm password" }
                req.session.info = { membername, password, confirmPassword, YOB, name }
                return res.redirect("/signup")
                // return res.render("auth/signup", {
                //     membername, password, confirmPassword, YOB, name
                // })

            }

            // if (errors.length > 0) {
            //     return res.status(400).render("auth/signup", {
            //         errors,
            //         membername, password, confirmPassword, YOB, name
            //     })
            // }
            const user = MemberService.getOneByMemberName(membername)
            if (user) {
                req.session.message = { type: "danger", message: "Member name already exists" }
                req.session.info = { membername, password, confirmPassword, YOB, name }
                return res.redirect("/signup")
                // errors.push({ message: "Member name already exists" })
                // return res.render("auth/signup", {
                //     membername, password, confirmPassword, YOB, name
                // })
            }


            await MemberService.createMember(membername, password, YOB, name)
            req.session.message = { type: "success", message: "Sign up successfully" }
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
                req.session.message = { type: "danger", message: info.message }
                req.session.info = { membername: req.body.membername, password: req.body.password }
                return res.status(400).redirect("/login")
                // return res.status(400).json({ message: info.message });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                if (user.isAdmin) {
                    req.session.message = { type: "success", message: "Login Successfully" }
                    return res.redirect("/watch/dashboard")
                } else {
                    req.session.message = { type: "success", message: "Login Successfully" }
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
            if (!user) {
                req.session.message = { type: "danger", message: "Cannot found user!" }
                return res.redirect("/member/dashboard")
            }
            const isMatch = await user.matchPassword(req.body.password)
            if (!isMatch) {
                req.session.message = { type: "danger", message: "Password is incorrect" }
                return res.redirect(`/member/${req.params.userId}`)
            }
            req.session.message = { type: "success", message: "Password is correct" }
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
                req.session.message = { type: "danger", message: "Password is not match" }
                return res.redirect(`/member/${userId}/change-pass`)
            }
            if (!userId) {
                req.session.message = { type: "danger", message: "User is not found" }
                return res.redirect(`/member/dashboard`)
                // return res.status(400)
            }
            const user = await memberService.getMemberById(userId)

            if (user.matchPassword(password)) {
                req.session.message = { type: "danger", message: "Password must be different the old one" }
                return res.redirect(`/member/${userId}/change-pass`)
            }
            user.password = password;
            await user.save();
            req.session.message = { type: "success", message: "Change password is completed" }
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
            return res.status(200).render("./auth/login");
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
            req.session.message = { type: "success", message: "Log out successfully" }
            return res.redirect("/watch");
        });
    }

}

module.exports = new AuthController