const commentServices = require("../services/commentServices");

class CommentController {
    async getCommentsByAuthor(req, res) {
        try {
            const { author } = req.body
            const comments = await commentServices.getAllCommentByAuthor(author)
            return res.render("layout", {
                body: "profile/comment",
                comments
            })
        } catch (error) {
            console.error("Error fetching comments:", error);
            return res.status(500).render("error");
        }
    }

    async getAllComments(req, res) {
        try {
            const comments = await commentServices.getAll()
            return res.render("layout", {
                body: "",
                comments
            })
        } catch (error) {
            console.error("Error fetching comments:", error);
            return res.status(500).render("error");
        }
    }

    async createComment(req, res) {
        try {
            const { watchId } = req.params;
            const { content, rating } = req.body;
            const author = req.user._id;

            console.log(watchId, content, rating, author);

        } catch (error) {
            console.error("Error create comments:", error);
            return res.status(500).render("error");
        }
    }

}

module.exports = new CommentController