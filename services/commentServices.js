const { Comment } = require("../model")

class CommentService {
    static async getAllComments() {
        try {
            const comments = await Comment.find({})
            return comments
        } catch (error) {
            throw new Error("Error fetching comments", error)
        }
    }
    static async getCommentById(commentId) {
        try {
            const comments = await Comment.findById(commentId)
            return comments
        } catch (error) {
            throw new Error("Error fetching comments", error)
        }
    }
    static async createComment(comment) {
        try {
            const newcomment = new Comment(comment)
            await newcomment.save()
            return newcomment
        } catch (error) {
            throw new Error("Error create comment", error)
        }
    }

    static async updateCommentById(commentId, data) {
        try {
            const updatecomment = await Comment.findByIdAndUpdate(commentId, data);
            return updatecomment
        } catch (error) {
            throw new Error("Error update comment", error)
        }
    }

    static async deleteCommentById(commentId) {
        try {
            const deletedcomment = await Comment.deleteOne({ _id: commentId });
            return deletedcomment
        } catch (error) {
            throw new Error("Error delete comment", error)
        }
    }
}

module.exports = CommentService