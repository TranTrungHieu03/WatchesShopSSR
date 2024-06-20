const memberService = require("../services/memberService");
const MemberService = require("../services/memberService");

class MemberController {
    async getAll(req, res) {
        try {
            const members = await MemberService.getAllmembers();
            return res.status(200).render("member/index", members)
        } catch (error) {
            console.error("Error fetching members:", error);
            return res.status(500).render("error");
        }
    }

    async getMember(req, res) {
        try {
            const { userId } = req.params;

            const user = await memberService.getMemberById(userId);
            if (req.user.isAdmin) {

                return res.status(200).render("adminLayout", {
                    body: "./member/index",
                    title: "Profile",
                    user: user,
                })
            } else {

                return res.status(200).render("layout", {
                    body: "./member/index",
                    title: "Profile",
                    user: user,
                })
            }


        } catch (error) {
            console.error("Error fetching members:", error);
            return res.status(500).render("error");
        }
    }


    async indexView(req, res) {
        try {
            const members = await MemberService.getAllmembers();
            return res.status(200).render("adminLayout", {
                body: "./member/dashboard",
                members: members,
                title: "Account Dashboard"
            })
        } catch (error) {
            console.error("Error fetching members:", error);
            return res.status(500).render("error");
        }
    }

}

module.exports = new MemberController