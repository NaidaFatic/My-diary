module.exports = mongoose => {
  const Diaries = mongoose.model(
    "diaries",
    mongoose.Schema({
      name: {
        type: String,
        min: 3,
        default: "My diary!"
      },
      description: {
        type: String,
        default: "This is my memory book!"
      },
      ownerID: {
        type: mongoose.ObjectId,
        required: true
      }
    }, {
      timestamps: true
    })
  );

  return Diaries;
};