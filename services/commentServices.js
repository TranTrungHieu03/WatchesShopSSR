const { Comment } = require("../model")
const { isComment } = require("./watchService")

class CommentService {
    async getAll() {
        try {
            const comments = await Comment.find({})
            return comments
        } catch (error) {
            throw new Error("Error fetching comments", error)
        }
    }
    async getOne(commentId) {
        try {
            const comments = await Comment.findById(commentId)
            return comments
        } catch (error) {
            throw new Error("Error fetching comments", error)
        }
    }
    async createComment(comment) {
        try {
            const newcomment = new Comment(comment)
            await newcomment.save()
            return newcomment
        } catch (error) {
            throw new Error("Error create comment", error)
        }
    }

    async updateById(commentId, data) {
        try {
            const updatecomment = await Comment.findByIdAndUpdate(commentId, data);
            return updatecomment
        } catch (error) {
            throw new Error("Error update comment", error)
        }
    }

    async deleteById(commentId) {
        try {
            const deletedcomment = await Comment.deleteOne({ _id: commentId });
            return deletedcomment
        } catch (error) {
            throw new Error("Error delete comment", error)
        }
    }

    async getAllByAuthor(author) {
        try {
            return await Comment.find({ author: author })
        } catch (error) {
            throw new Error("Error fetching comment", error)
        }
    }
    async isComment(list, author) {
        try {
            var rs = true;
            list.forEach((w) => {
                if (w.author._id.toString() == author.toString()) {
                    rs = false;
                }
            })
            return rs
        } catch (error) {
            throw new Error("Error find comment", error)
        }
    }

}

module.exports = new CommentService