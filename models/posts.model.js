module.exports = mongoose => {
    const Posts = mongoose.model(
        "posts",
        mongoose.Schema({
            name: {
                type: String,
                default: "My post!"
            },
            description: {
                type: String,
                default: "This is my memory!"
            },
            diaryID: {
                type: mongoose.ObjectId,
                required: true
            },
            likes: [mongoose.ObjectId],
            profilePic: Buffer
        }, {
            timestamps: true
        })
    );

    return Posts;
};