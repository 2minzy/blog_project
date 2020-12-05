const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

// Middleware will happen whenever you are doin createCategory BEFORE(pre) saving to database
categorySchema.pre('save', function (next) {
  const category = this;

  if (!category.slug || category.slug === '') {
    category.slug = category.name.toLowerCase().replace(' ', '-');
  }
  next(); // Next strp is saving category into MongoDB database
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
