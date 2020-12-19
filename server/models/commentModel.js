const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.set('toJSON', {
  virtuals: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
