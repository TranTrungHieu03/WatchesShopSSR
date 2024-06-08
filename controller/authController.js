const MemberService = require("../services/memberService");
const bcrypt = require('bcrypt');
const { Token } = require("../utils/token");
const saltRounds = 10;

class AuthController {

    async signUp(req, res) {
        try {
            const { memberName, password, confirmPassword, YOB, name } = req.body
            const errors = []
            if (!memberName || !password || !confirmPassword) {
                errors.push({ message: "Please enter all fields" })
            }
            if (password !== confirmPassword) {
                errors.push({ message: "Password must be matched with confirm password" })

            }
            if (errors.length > 0) {
                return res.status(404).render("auth/signup", {
                    errors,
                    memberName, password, confirmPassword, YOB, name
                })
            }

            const user = MemberService.getOneByMemberName(memberName)
            if (!user) {
                errors.push({ message: "Member name already exists" })
                return res.status(404).render("auth/signup", {
                    errors,
                    memberName, password, confirmPassword, YOB, name
                })
            }
            const hashPassword = bcrypt.hashSync(password, saltRounds);

            await MemberService.createMember({ membername: memberName, password: hashPassword, YOB, name, isAdmin: false })

            return res.status(201).render("auth/login", { message: "Sign up an account successfully" })
        } catch (error) {
            console.error("Error Sign up:", error);
            return res.status(500).render("error");
        }
    }

    async login(req, res) {
        try {
            const { memberName, password } = req.body;

            const user = await MemberService.getOneByMemberName(memberName);

            if (!user) {
                return res.status(401).render("login", { memberNameMessage: "memberName not found" })
            }
            const isMatched = bcrypt.compareSync(password, user.password)
            if (!isMatched) {
                return res.status(404).render("login", { passwordMessage: "Password is wrong" })
            }

            const accessToken = await Token.generateAccessToken({ memberName, password })
            const refreshToken = await Token.generateRefreshToken({ memberName, password })

            await res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: "strict",
                secure: true
            })

            return res.status(200).render("layout")
            // , {
            //     body: "index",
            //     message: "Login successfully",
            //     accessToken
            // }
        } catch (error) {
            console.error("Error login:", error);
            return res.status(500).render("error");
        }
    }

    async loginWithGoogle(req, res) {

    }


    async refreshToken(req, res) {

    }
    async indexSignup(req, res) {
        try {
            console.log("Signup GET request received");
            return res.status(200).render("auth/signup")
        } catch (error) {
            console.error("Error signup:", error);
            return res.status(500).render("error");
        }

    }
    async indexLogin(req, res) {
        try {
            console.log("Login GET request received");
            return res.status(200).render("auth/login")
        } catch (error) {
            console.error("Error login:", error);
            return res.status(500).render("error");
        }
    }


}

module.exports = new AuthController