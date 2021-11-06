module.exports = mongoose => {
    const Comments = mongoose.model(
        "comments",
        mongoose.Schema({
            postID: {
                type: mongoose.ObjectId,
                required: true
            },
            description: {
                type: String,
                default: "Comment on post!"
            },
            ownerID: {
                type: mongoose.ObjectId,
                required: true
            },
            replay: [mongoose.ObjectId]
        }, {
            timestamps: true
        })
    );

    return Comments;
};