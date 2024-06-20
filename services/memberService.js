const { Member } = require("../model")

class MemberService {
    async getAllmembers() {
        try {
            const members = await Member.find({})
            return members
        } catch (error) {
            throw new Error("Error fetching members", error)
        }
    }
    async getMemberById(memberId) {
        try {
            const member = await Member.findById(memberId)
            return member
        } catch (error) {
            throw new Error("Error fetching members", error)
        }
    }
    async createMember(membername, password, YOB, name) {
        try {
            const newmember = new Member({membername, password, YOB, name})
            console.log(newmember);
            await newmember.save()
            return newmember  
        } catch (error) {
            throw new Error("Error create member", error)
        }
    }

    async updateMemberById(memberId, data) {
        try {
            const updatemember = await Member.findByIdAndUpdate(memberId, data);
            return updatemember
        } catch (error) {
            throw new Error("Error update member", error)
        }
    }

    async deleteMemberById(memberId) {
        try {
            const deletedmember = await Member.deleteOne({ _id: memberId });
            return deletedmember
        } catch (error) {
            throw new Error("Error delete member", error)
        }
    }
    async getOneByMemberName(memberName) {
        try {
            return await Member.findOne({ membername: memberName })
        } catch (error) {
            throw new Error("Error find member", error)
        }
    }
    async updatePassword(id, password) {
        try {
            return await Member.findByIdAndUpdate(id, { password: password })
        } catch (error) {
            throw new Error("Error update password", error)
        }
    }

}

module.exports = new MemberService