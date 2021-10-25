module.exports = mongoose => {
  const Owners = mongoose.model(
    "owners",
    mongoose.Schema({
      name: {
        type: String,
        min: 3,
        required: [true, 'Have to have name!']
      },
      surname: {
        type: String,
        min: 3,
        required: [true, 'Have to have surname!']
      },
      email: {
        type: String,
        min: 5,
        required: [true, 'Have to have email!']
      },
      password: {
        type: String,
        min: 3,
        required: [true, 'Have to have password!']
      },
      age: Number,
      comment: String,
      profilePic: Buffer,
      friends: [mongoose.ObjectId],
      friendsRequest: [mongoose.ObjectId]
    }, {
      timestamps: true
    })
  );

  return Owners;
};