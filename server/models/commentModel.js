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
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

// make id available to frontend without underscore _id -> id
commentSchema.set('toJSON', {
  virtuals: true,
});

// combine all strings to a single field to make a searching index
commentSchema.index({ '$**': 'text' });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
