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
   
}

module.exports = new MemberController