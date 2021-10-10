module.exports = mongoose => {
    const Owners = mongoose.model(
      "owners",
      mongoose.Schema(
        {
          name: String,
          surname: String,
          email: String,
          password: String,
          age: Number,
          comment: String,
          profilePic: Buffer,
          friends: [mongoose.ObjectId],
          friendsRequest: [mongoose.ObjectId]
        },
        { timestamps: true }
      )
    );
  
    return Owners;
  };