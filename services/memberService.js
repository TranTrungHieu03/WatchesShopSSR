const { Member } = require("../model")

class MemberService {
    static async getAllmembers() {
        try {
            const members = await Member.find({})
            return members
        } catch (error) {
            throw new Error("Error fetching members", error)
        }
    }
    static async getMemberById(memberId) {
        try {
            const member = await Member.findById(memberId)
            return member
        } catch (error) {
            throw new Error("Error fetching members", error)
        }
    }
    static async createMember(member) {
        try {
            const newmember = new Member(member)
            return await newmember.save()
        } catch (error) {
            throw new Error("Error create member", error)
        }
    }

    static async updateMemberById(memberId, data) {
        try {
            const updatemember = await Member.findByIdAndUpdate(memberId, data);
            return updatemember
        } catch (error) {
            throw new Error("Error update member", error)
        }
    }

    static async deleteMemberById(memberId) {
        try {
            const deletedmember = await Member.deleteOne({ _id: memberId });
            return deletedmember
        } catch (error) {
            throw new Error("Error delete member", error)
        }
    }
    static async getOneByMemberName(memberName) {
        try {
            return await Member.findOne({ membername: memberName })
        } catch (error) {
            throw new Error("Error find member", error)
        }
    }
}

module.exports = MemberService